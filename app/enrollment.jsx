// app/enrollment.jsx - Multi-step Online Enrollment Wizard
import React, { useState } from 'react';
import {
  View,
  Text,
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
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../src/firebase/config';
import { useAuth } from '../src/context/AuthContext';
import { colors, spacing, shadows } from '../src/theme';

export default function EnrollmentScreen() {
  const router = useRouter();
  const { user } = useAuth();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Step 1: Student Details
  const [lrn, setLrn] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('Male');
  const [studentType, setStudentType] = useState('New');
  const [address, setAddress] = useState('');
  const [contactNo, setContactNo] = useState('');

  // Step 2: Parent / Guardian
  const [guardianName, setGuardianName] = useState('');
  const [guardianRelationship, setGuardianRelationship] = useState('Parent');
  const [guardianContact, setGuardianContact] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');

  // Step 3: Academic Background
  const [lastSchool, setLastSchool] = useState('');
  const [lastGrade, setLastGrade] = useState('Grade 6');
  const [generalAverage, setGeneralAverage] = useState('');

  // Step 4: Grade Level & Strand
  const [selectedGrade, setSelectedGrade] = useState('Grade 7');
  const [selectedStrand, setSelectedStrand] = useState('GAS');

  // Step 5: Data Privacy
  const [agreeTerms, setAgreeTerms] = useState(false);

  const gradeOptions = ['Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];
  const strandOptions = ['GAS (General Academic)', 'HUMMS (Humanities & Social Sciences)', 'TVL-Cookery'];
  const isSHS = selectedGrade === 'Grade 11' || selectedGrade === 'Grade 12';

  const validateCurrentStep = () => {
    if (step === 1) {
      if (!firstName.trim() || !lastName.trim() || !dob.trim() || !address.trim()) {
        Alert.alert('Required Fields', 'Please fill in student name, birthdate, and home address.');
        return false;
      }
    } else if (step === 2) {
      if (!guardianName.trim() || !guardianContact.trim()) {
        Alert.alert('Required Fields', 'Please provide parent/guardian name and contact number.');
        return false;
      }
    } else if (step === 3) {
      if (!lastSchool.trim()) {
        Alert.alert('Required Fields', 'Please enter your previous school attended.');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmitEnrollment = async () => {
    if (!agreeTerms) {
      Alert.alert('Consent Required', 'Please confirm that you agree to the enrollment terms and data privacy policy.');
      return;
    }

    setLoading(true);
    try {
      const schoolYear = '2026-2027';
      const cleanStrand = isSHS ? selectedStrand.split(' ')[0] : null;

      await addDoc(collection(db, 'enrollments'), {
        userId: user ? user.uid : 'guest_' + Date.now(),
        lrn: lrn.trim() || null,
        firstName: firstName.trim(),
        middleName: middleName.trim() || null,
        lastName: lastName.trim(),
        fullName: middleName.trim() ? `${firstName.trim()} ${middleName.trim()} ${lastName.trim()}` : `${firstName.trim()} ${lastName.trim()}`,
        birthdate: dob.trim(),
        gender: gender,
        studentType: studentType.toLowerCase(),
        address: address.trim(),
        contactNumber: contactNo.trim(),
        guardianName: guardianName.trim(),
        guardianRelationship: guardianRelationship,
        guardianContact: guardianContact.trim(),
        emergencyContact: emergencyContact.trim(),
        lastSchoolAttended: lastSchool.trim(),
        lastGradeCompleted: lastGrade,
        generalAverage: generalAverage.trim() || null,
        grade: selectedGrade,
        strand: cleanStrand,
        schoolYear: schoolYear,
        status: 'Pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      setLoading(false);
      Alert.alert(
        'Enrollment Submitted! 🎉',
        `Your application for ${selectedGrade} (SY ${schoolYear}) has been submitted for review. Please check your requirements next.`,
        [
          {
            text: 'View Requirements / Dashboard',
            onPress: () => {
              if (user) {
                router.replace('/(student)/requirements');
              } else {
                router.replace('/login');
              }
            },
          },
        ]
      );
    } catch (error) {
      setLoading(false);
      console.error('Enrollment error:', error);
      Alert.alert('Error', error.message || 'Failed to submit enrollment. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Step Indicator Header */}
      <View style={styles.stepHeader}>
        <View style={styles.stepTrack}>
          {[1, 2, 3, 4, 5].map((s) => (
            <React.Fragment key={s}>
              <View
                style={[
                  styles.stepBadge,
                  step === s && styles.stepBadgeActive,
                  step > s && styles.stepBadgeCompleted,
                ]}
              >
                {step > s ? (
                  <Ionicons name="checkmark" size={14} color="#fff" />
                ) : (
                  <Text
                    style={[
                      styles.stepBadgeText,
                      step === s && styles.stepBadgeTextActive,
                    ]}
                  >
                    {s}
                  </Text>
                )}
              </View>
              {s < 5 && (
                <View
                  style={[
                    styles.stepLine,
                    step > s && { backgroundColor: colors.success },
                  ]}
                />
              )}
            </React.Fragment>
          ))}
        </View>
        <Text style={styles.stepTitleText}>
          {step === 1 && 'Step 1: Student Information'}
          {step === 2 && 'Step 2: Parent / Guardian Info'}
          {step === 3 && 'Step 3: Academic Background'}
          {step === 4 && 'Step 4: Grade Level & Track'}
          {step === 5 && 'Step 5: Review & Submit'}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={[styles.card, shadows.md]}>
          {/* STEP 1 */}
          {step === 1 && (
            <View>
              <Text style={styles.sectionTitle}>Student Personal Details</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Learner Reference Number (LRN)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="12-digit LRN (if available)"
                  placeholderTextColor={colors.textMuted}
                  value={lrn}
                  onChangeText={setLrn}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.row}>
                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.inputLabel}>First Name *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    placeholderTextColor={colors.textMuted}
                    value={firstName}
                    onChangeText={setFirstName}
                  />
                </View>
                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.inputLabel}>Middle Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Middle Name"
                    placeholderTextColor={colors.textMuted}
                    value={middleName}
                    onChangeText={setMiddleName}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Last Name *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Last Name"
                  placeholderTextColor={colors.textMuted}
                  value={lastName}
                  onChangeText={setLastName}
                />
              </View>

              <View style={styles.row}>
                <View style={[styles.inputGroup, { flex: 1.2 }]}>
                  <Text style={styles.inputLabel}>Date of Birth (YYYY-MM-DD) *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="2009-08-15"
                    placeholderTextColor={colors.textMuted}
                    value={dob}
                    onChangeText={setDob}
                  />
                </View>
                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.inputLabel}>Gender *</Text>
                  <View style={styles.genderRow}>
                    {['Male', 'Female'].map((g) => (
                      <TouchableOpacity
                        key={g}
                        style={[styles.smallPill, gender === g && styles.smallPillActive]}
                        onPress={() => setGender(g)}
                      >
                        <Text style={[styles.smallPillText, gender === g && styles.smallPillTextActive]}>
                          {g}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Student Enrollee Type</Text>
                <View style={styles.genderRow}>
                  {['New', 'Continuing', 'Transferee'].map((t) => (
                    <TouchableOpacity
                      key={t}
                      style={[styles.smallPill, studentType === t && styles.smallPillActive]}
                      onPress={() => setStudentType(t)}
                    >
                      <Text style={[styles.smallPillText, studentType === t && styles.smallPillTextActive]}>
                        {t}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Complete Home Address *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="House No., Street, Barangay, City, Province"
                  placeholderTextColor={colors.textMuted}
                  value={address}
                  onChangeText={setAddress}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Student Contact / Mobile No.</Text>
                <TextInput
                  style={styles.input}
                  placeholder="09123456789"
                  placeholderTextColor={colors.textMuted}
                  value={contactNo}
                  onChangeText={setContactNo}
                  keyboardType="phone-pad"
                />
              </View>
            </View>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <View>
              <Text style={styles.sectionTitle}>Parent & Guardian Information</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Parent / Guardian Full Name *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  placeholderTextColor={colors.textMuted}
                  value={guardianName}
                  onChangeText={setGuardianName}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Relationship</Text>
                <View style={styles.genderRow}>
                  {['Mother', 'Father', 'Guardian'].map((r) => (
                    <TouchableOpacity
                      key={r}
                      style={[styles.smallPill, guardianRelationship === r && styles.smallPillActive]}
                      onPress={() => setGuardianRelationship(r)}
                    >
                      <Text style={[styles.smallPillText, guardianRelationship === r && styles.smallPillTextActive]}>
                        {r}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Parent/Guardian Contact No. *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="09181234567"
                  placeholderTextColor={colors.textMuted}
                  value={guardianContact}
                  onChangeText={setGuardianContact}
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Emergency Contact Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Alternate phone number"
                  placeholderTextColor={colors.textMuted}
                  value={emergencyContact}
                  onChangeText={setEmergencyContact}
                  keyboardType="phone-pad"
                />
              </View>
            </View>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <View>
              <Text style={styles.sectionTitle}>Academic Background</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Last Elementary/High School Attended *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="School Name"
                  placeholderTextColor={colors.textMuted}
                  value={lastSchool}
                  onChangeText={setLastSchool}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Last Grade Level Completed</Text>
                <View style={styles.wrapGrid}>
                  {['Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11'].map((lg) => (
                    <TouchableOpacity
                      key={lg}
                      style={[styles.chipPill, lastGrade === lg && styles.chipPillActive]}
                      onPress={() => setLastGrade(lg)}
                    >
                      <Text style={[styles.chipPillText, lastGrade === lg && styles.chipPillTextActive]}>
                        {lg}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>General Average / Final GPA</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. 88.5"
                  placeholderTextColor={colors.textMuted}
                  value={generalAverage}
                  onChangeText={setGeneralAverage}
                  keyboardType="decimal-pad"
                />
              </View>
            </View>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <View>
              <Text style={styles.sectionTitle}>Select Grade Level to Enroll</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Grade Level *</Text>
                <View style={styles.gradeGrid}>
                  {gradeOptions.map((g) => (
                    <TouchableOpacity
                      key={g}
                      style={[styles.gradeCard, selectedGrade === g && styles.gradeCardActive]}
                      onPress={() => setSelectedGrade(g)}
                    >
                      <Ionicons
                        name="school-outline"
                        size={20}
                        color={selectedGrade === g ? '#fff' : colors.primary}
                      />
                      <Text style={[styles.gradeCardText, selectedGrade === g && styles.gradeCardTextActive]}>
                        {g}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {isSHS && (
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Senior High School Track / Strand *</Text>
                  {strandOptions.map((str) => (
                    <TouchableOpacity
                      key={str}
                      style={[styles.strandCard, selectedStrand === str && styles.strandCardActive]}
                      onPress={() => setSelectedStrand(str)}
                    >
                      <Ionicons
                        name={selectedStrand === str ? 'radio-button-on' : 'radio-button-off'}
                        size={18}
                        color={selectedStrand === str ? colors.primary : colors.textMuted}
                      />
                      <Text style={[styles.strandCardText, selectedStrand === str && styles.strandCardTextActive]}>
                        {str}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          )}

          {/* STEP 5 */}
          {step === 5 && (
            <View>
              <Text style={styles.sectionTitle}>Review & Data Privacy Consent</Text>

              <View style={styles.summaryBox}>
                <Text style={styles.summaryHeading}>Enrollment Summary</Text>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Student Name:</Text>
                  <Text style={styles.summaryValue}>{firstName} {lastName}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Grade to Enroll:</Text>
                  <Text style={styles.summaryValue}>{selectedGrade} {isSHS ? `(${selectedStrand.split(' ')[0]})` : ''}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Student Type:</Text>
                  <Text style={styles.summaryValue}>{studentType} Student</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Guardian:</Text>
                  <Text style={styles.summaryValue}>{guardianName} ({guardianContact})</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>School Year:</Text>
                  <Text style={styles.summaryValue}>2026-2027</Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.consentRow}
                onPress={() => setAgreeTerms(!agreeTerms)}
              >
                <Ionicons
                  name={agreeTerms ? 'checkbox' : 'square-outline'}
                  size={24}
                  color={agreeTerms ? colors.primary : colors.textMuted}
                />
                <Text style={styles.consentText}>
                  I hereby certify that all information provided is true, correct, and complete. I consent to the collection and processing of data for PLSNHS academic and enrollment purposes.
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Navigation Action Buttons */}
          <View style={styles.btnRow}>
            {step > 1 && (
              <TouchableOpacity style={styles.backBtn} onPress={handlePrev}>
                <Ionicons name="arrow-back" size={18} color={colors.text} />
                <Text style={styles.backBtnText}>Previous</Text>
              </TouchableOpacity>
            )}

            {step < 5 ? (
              <TouchableOpacity style={[styles.nextBtn, { flex: 1 }]} onPress={handleNext}>
                <Text style={styles.nextBtnText}>Continue</Text>
                <Ionicons name="arrow-forward" size={18} color="#fff" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.submitBtn, loading && styles.btnDisabled, { flex: 1 }]}
                onPress={handleSubmitEnrollment}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <>
                    <Ionicons name="paper-plane" size={18} color="#fff" />
                    <Text style={styles.submitBtnText}>Submit Enrollment</Text>
                  </>
                )}
              </TouchableOpacity>
            )}
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
  stepHeader: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    alignItems: 'center',
  },
  stepTrack: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBadgeActive: {
    backgroundColor: colors.accent,
  },
  stepBadgeCompleted: {
    backgroundColor: colors.success,
  },
  stepBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
  stepBadgeTextActive: {
    color: colors.primary,
  },
  stepLine: {
    width: 24,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginHorizontal: 4,
  },
  stepTitleText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 540,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
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
  genderRow: {
    flexDirection: 'row',
    gap: 6,
  },
  smallPill: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.inputBg,
    alignItems: 'center',
  },
  smallPillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  smallPillText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  smallPillTextActive: {
    color: '#fff',
  },
  wrapGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chipPill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.inputBg,
  },
  chipPillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipPillText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  chipPillTextActive: {
    color: '#fff',
  },
  gradeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  gradeCard: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.inputBg,
  },
  gradeCardActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  gradeCardText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  gradeCardTextActive: {
    color: '#fff',
  },
  strandCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.inputBg,
    marginBottom: 8,
  },
  strandCardActive: {
    borderColor: colors.primary,
    backgroundColor: '#EEF2FF',
  },
  strandCardText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  strandCardTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  summaryBox: {
    backgroundColor: colors.inputBg,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  summaryHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  summaryValue: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.text,
  },
  consentRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
    marginVertical: spacing.md,
  },
  consentText: {
    flex: 1,
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  btnRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: spacing.lg,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  backBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
  },
  nextBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.success,
    paddingVertical: 14,
    borderRadius: 10,
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  btnDisabled: {
    opacity: 0.7,
  },
});
