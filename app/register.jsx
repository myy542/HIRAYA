// app/register.jsx - Student Account Registration
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../src/firebase/config';
import { colors, spacing, shadows } from '../src/theme';

export default function RegisterScreen() {
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('Male');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Password validation checks
  const hasLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isPasswordStrong = hasLength && hasUpper && hasLower && hasNumber && hasSpecial;
  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  const validCount = [hasLength, hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;
  const strengthPercent = (validCount / 5) * 100;

  const handleRegister = async () => {
    setErrorMsg('');

    if (!firstName.trim() || !lastName.trim()) {
      setErrorMsg('Please enter your full name (First and Last name).');
      return;
    }
    if (!birthdate.trim()) {
      setErrorMsg('Please enter your birthdate (YYYY-MM-DD).');
      return;
    }

    // Age validation
    const birth = new Date(birthdate.trim());
    if (isNaN(birth.getTime())) {
      setErrorMsg('Please enter a valid birthdate format (YYYY-MM-DD).');
      return;
    }
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    if (age < 12 || age > 35) {
      setErrorMsg(`Age calculated is ${age}. Eligible high school age is 12 to 35.`);
      return;
    }

    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!isPasswordStrong) {
      setErrorMsg('Password does not meet all security requirements.');
      return;
    }
    if (!passwordsMatch) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      const user = userCredential.user;

      const fullName = middleName.trim()
        ? `${firstName.trim()} ${middleName.trim()} ${lastName.trim()}`
        : `${firstName.trim()} ${lastName.trim()}`;

      // Create user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        firstName: firstName.trim(),
        middleName: middleName.trim() || null,
        lastName: lastName.trim(),
        fullName: fullName,
        birthdate: birthdate.trim(),
        gender: gender,
        email: email.trim(),
        role: 'Student',
        status: 'pending',
        emailVerified: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      setLoading(false);
      Alert.alert(
        'Registration Successful! 🎉',
        'Your student account has been created. You can now access your portal.',
        [{ text: 'Continue', onPress: () => router.replace('/(student)/dashboard') }]
      );
    } catch (error) {
      setLoading(false);
      console.error('Registration error:', error);
      if (error.code === 'auth/email-already-in-use') {
        setErrorMsg('This email is already registered. Please log in instead.');
      } else if (error.code === 'auth/weak-password') {
        setErrorMsg('Password is too weak.');
      } else {
        setErrorMsg(error.message || 'Registration failed. Please try again.');
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.title}>Student Registration</Text>
          <Text style={styles.subtitle}>Create your official PLSNHS account</Text>
        </View>

        <View style={[styles.card, shadows.md]}>
          {errorMsg ? (
            <View style={styles.errorBanner}>
              <Ionicons name="alert-circle" size={18} color={colors.danger} />
              <Text style={styles.errorText}>{errorMsg}</Text>
            </View>
          ) : null}

          {/* First & Middle Name */}
          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.inputLabel}>First Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="Juan"
                placeholderTextColor={colors.textMuted}
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.inputLabel}>Middle Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Santos"
                placeholderTextColor={colors.textMuted}
                value={middleName}
                onChangeText={setMiddleName}
              />
            </View>
          </View>

          {/* Last Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Last Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Dela Cruz"
              placeholderTextColor={colors.textMuted}
              value={lastName}
              onChangeText={setLastName}
            />
          </View>

          {/* Birthdate & Gender */}
          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1.2 }]}>
              <Text style={styles.inputLabel}>Birthdate (YYYY-MM-DD) *</Text>
              <TextInput
                style={styles.input}
                placeholder="2008-05-15"
                placeholderTextColor={colors.textMuted}
                value={birthdate}
                onChangeText={setBirthdate}
              />
            </View>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.inputLabel}>Gender *</Text>
              <View style={styles.genderRow}>
                {['Male', 'Female'].map((g) => (
                  <TouchableOpacity
                    key={g}
                    style={[styles.genderBtn, gender === g && styles.genderBtnActive]}
                    onPress={() => setGender(g)}
                  >
                    <Text style={[styles.genderBtnText, gender === g && styles.genderBtnTextActive]}>
                      {g}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email Address *</Text>
            <TextInput
              style={styles.input}
              placeholder="student@example.com"
              placeholderTextColor={colors.textMuted}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Password *</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.input, { flex: 1, borderWidth: 0, backgroundColor: 'transparent' }]}
                placeholder="Create a strong password"
                placeholderTextColor={colors.textMuted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            </View>

            {/* Strength Bar */}
            {password.length > 0 && (
              <View style={styles.strengthContainer}>
                <View
                  style={[
                    styles.strengthFill,
                    {
                      width: `${strengthPercent}%`,
                      backgroundColor:
                        strengthPercent < 40
                          ? colors.danger
                          : strengthPercent < 80
                          ? colors.warning
                          : colors.success,
                    },
                  ]}
                />
              </View>
            )}

            {/* Password Requirements Checklist */}
            <View style={styles.reqList}>
              <View style={styles.reqItem}>
                <Ionicons
                  name={hasLength ? 'checkmark-circle' : 'ellipse-outline'}
                  size={14}
                  color={hasLength ? colors.success : colors.textMuted}
                />
                <Text style={[styles.reqText, hasLength && styles.reqTextValid]}>At least 8 characters</Text>
              </View>
              <View style={styles.reqItem}>
                <Ionicons
                  name={hasUpper ? 'checkmark-circle' : 'ellipse-outline'}
                  size={14}
                  color={hasUpper ? colors.success : colors.textMuted}
                />
                <Text style={[styles.reqText, hasUpper && styles.reqTextValid]}>Uppercase letter</Text>
              </View>
              <View style={styles.reqItem}>
                <Ionicons
                  name={hasLower ? 'checkmark-circle' : 'ellipse-outline'}
                  size={14}
                  color={hasLower ? colors.success : colors.textMuted}
                />
                <Text style={[styles.reqText, hasLower && styles.reqTextValid]}>Lowercase letter</Text>
              </View>
              <View style={styles.reqItem}>
                <Ionicons
                  name={hasNumber ? 'checkmark-circle' : 'ellipse-outline'}
                  size={14}
                  color={hasNumber ? colors.success : colors.textMuted}
                />
                <Text style={[styles.reqText, hasNumber && styles.reqTextValid]}>At least 1 number</Text>
              </View>
              <View style={styles.reqItem}>
                <Ionicons
                  name={hasSpecial ? 'checkmark-circle' : 'ellipse-outline'}
                  size={14}
                  color={hasSpecial ? colors.success : colors.textMuted}
                />
                <Text style={[styles.reqText, hasSpecial && styles.reqTextValid]}>Special character (!@#$...)</Text>
              </View>
            </View>
          </View>

          {/* Confirm Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Confirm Password *</Text>
            <TextInput
              style={[
                styles.input,
                confirmPassword.length > 0 &&
                  (passwordsMatch ? styles.inputValid : styles.inputInvalid),
              ]}
              placeholder="Confirm your password"
              placeholderTextColor={colors.textMuted}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showPassword}
            />
            {confirmPassword.length > 0 && (
              <Text
                style={[
                  styles.matchStatusText,
                  { color: passwordsMatch ? colors.success : colors.danger },
                ]}
              >
                {passwordsMatch ? '✓ Passwords match' : '✗ Passwords do not match'}
              </Text>
            )}
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.submitBtn, loading && styles.btnDisabled]}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Ionicons name="person-add" size={18} color="#fff" />
                <Text style={styles.submitBtnText}>Create Account</Text>
              </>
            )}
          </TouchableOpacity>

          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Already registered? </Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text style={styles.loginLink}>Sign in here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  logoImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.primary,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  card: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.dangerLight,
    padding: spacing.md,
    borderRadius: 10,
    marginBottom: spacing.md,
  },
  errorText: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  inputGroup: {
    marginBottom: spacing.md,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
  },
  input: {
    backgroundColor: colors.inputBg,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: colors.text,
  },
  inputValid: {
    borderColor: colors.success,
  },
  inputInvalid: {
    borderColor: colors.danger,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBg,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    paddingRight: 10,
  },
  genderRow: {
    flexDirection: 'row',
    gap: 6,
  },
  genderBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.inputBg,
    alignItems: 'center',
  },
  genderBtnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  genderBtnText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  genderBtnTextActive: {
    color: '#fff',
  },
  strengthContainer: {
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    marginTop: 6,
    overflow: 'hidden',
  },
  strengthFill: {
    height: '100%',
  },
  reqList: {
    marginTop: 8,
    gap: 4,
  },
  reqItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  reqText: {
    fontSize: 12,
    color: colors.textMuted,
  },
  reqTextValid: {
    color: colors.success,
    fontWeight: '500',
  },
  matchStatusText: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: spacing.md,
  },
  btnDisabled: {
    opacity: 0.7,
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  loginText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  loginLink: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 14,
  },
});
