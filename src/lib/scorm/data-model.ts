export function getScorm12Defaults(): Map<string, string> {
  return new Map<string, string>([
    ['cmi.core.student_id', ''],
    ['cmi.core.student_name', ''],
    ['cmi.core.lesson_location', ''],
    ['cmi.core.credit', 'credit'],
    ['cmi.core.lesson_status', 'not attempted'],
    ['cmi.core.entry', 'ab-initio'],
    ['cmi.core.score.raw', ''],
    ['cmi.core.score.min', ''],
    ['cmi.core.score.max', ''],
    ['cmi.core.total_time', '0000:00:00'],
    ['cmi.core.session_time', '0000:00:00'],
    ['cmi.core.lesson_mode', 'normal'],
    ['cmi.core.exit', ''],
    ['cmi.suspend_data', ''],
    ['cmi.launch_data', ''],
    ['cmi.comments', ''],
    ['cmi.comments_from_lms', ''],
    ['cmi.objectives._count', '0'],
    ['cmi.student_data.mastery_score', ''],
    ['cmi.student_data.max_time_allowed', ''],
    ['cmi.student_data.time_limit_action', ''],
    ['cmi.student_preference.audio', '0'],
    ['cmi.student_preference.language', ''],
    ['cmi.student_preference.speed', '0'],
    ['cmi.student_preference.text', '0'],
    ['cmi.interactions._count', '0'],
  ]);
}

export function getScorm2004Defaults(): Map<string, string> {
  return new Map<string, string>([
    ['cmi.learner_id', ''],
    ['cmi.learner_name', ''],
    ['cmi.location', ''],
    ['cmi.credit', 'credit'],
    ['cmi.completion_status', 'unknown'],
    ['cmi.completion_threshold', ''],
    ['cmi.success_status', 'unknown'],
    ['cmi.entry', 'ab-initio'],
    ['cmi.score.raw', ''],
    ['cmi.score.min', ''],
    ['cmi.score.max', ''],
    ['cmi.score.scaled', ''],
    ['cmi.total_time', 'PT0H0M0S'],
    ['cmi.session_time', 'PT0H0M0S'],
    ['cmi.mode', 'normal'],
    ['cmi.exit', ''],
    ['cmi.suspend_data', ''],
    ['cmi.launch_data', ''],
    ['cmi.comments_from_learner._count', '0'],
    ['cmi.comments_from_lms._count', '0'],
    ['cmi.objectives._count', '0'],
    ['cmi.interactions._count', '0'],
    ['cmi.learner_preference.audio_level', '1'],
    ['cmi.learner_preference.language', ''],
    ['cmi.learner_preference.delivery_speed', '1'],
    ['cmi.learner_preference.audio_captioning', '0'],
    ['cmi.scaled_passing_score', ''],
    ['cmi.max_time_allowed', ''],
    ['cmi.time_limit_action', 'continue,no message'],
  ]);
}

export const SCORM_12_READ_ONLY: ReadonlySet<string> = new Set([
  'cmi.core.student_id',
  'cmi.core.student_name',
  'cmi.core.credit',
  'cmi.core.entry',
  'cmi.core.total_time',
  'cmi.core.lesson_mode',
  'cmi.launch_data',
  'cmi.comments_from_lms',
  'cmi.student_data.mastery_score',
  'cmi.student_data.max_time_allowed',
  'cmi.student_data.time_limit_action',
]);

export const SCORM_12_WRITE_ONLY: ReadonlySet<string> = new Set([
  'cmi.core.session_time',
  'cmi.core.exit',
]);

export const SCORM_2004_READ_ONLY: ReadonlySet<string> = new Set([
  'cmi.learner_id',
  'cmi.learner_name',
  'cmi.credit',
  'cmi.entry',
  'cmi.total_time',
  'cmi.mode',
  'cmi.launch_data',
  'cmi.completion_threshold',
  'cmi.scaled_passing_score',
  'cmi.max_time_allowed',
  'cmi.time_limit_action',
]);

export const SCORM_2004_WRITE_ONLY: ReadonlySet<string> = new Set([
  'cmi.session_time',
  'cmi.exit',
]);
