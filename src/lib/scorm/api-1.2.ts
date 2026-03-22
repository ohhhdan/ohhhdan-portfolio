import type { ScormApiState } from './types';
import { Scorm12ErrorCode, SCORM_12_ERROR_STRINGS } from './types';
import { getScorm12Defaults, SCORM_12_READ_ONLY, SCORM_12_WRITE_ONLY } from './data-model';

/**
 * SCORM 1.2 Runtime API implementation.
 *
 * Implements the 8 required API functions:
 *   LMSInitialize, LMSFinish, LMSGetValue, LMSSetValue, LMSCommit,
 *   LMSGetLastError, LMSGetErrorString, LMSGetDiagnostic
 *
 * All functions return string values ("true"/"false") per the SCORM 1.2 spec.
 */
export class Scorm12Api {
  private state: ScormApiState;

  constructor() {
    this.state = {
      initialized: false,
      terminated: false,
      lastError: Scorm12ErrorCode.NoError,
      cmiData: getScorm12Defaults(),
    };
  }

  /**
   * Initialize communication with the LMS.
   */
  LMSInitialize(_param: string): string {
    if (this.state.initialized) {
      this.state.lastError = Scorm12ErrorCode.GeneralException;
      return 'false';
    }

    this.state.initialized = true;
    this.state.terminated = false;
    this.state.lastError = Scorm12ErrorCode.NoError;
    return 'true';
  }

  /**
   * Terminate communication with the LMS.
   */
  LMSFinish(_param: string): string {
    if (!this.state.initialized) {
      this.state.lastError = Scorm12ErrorCode.NotInitialized;
      return 'false';
    }

    this.state.initialized = false;
    this.state.terminated = true;
    this.state.lastError = Scorm12ErrorCode.NoError;
    return 'true';
  }

  /**
   * Retrieve a value from the CMI data model.
   */
  LMSGetValue(element: string): string {
    if (!this.state.initialized) {
      this.state.lastError = Scorm12ErrorCode.NotInitialized;
      return '';
    }

    if (!element || typeof element !== 'string') {
      this.state.lastError = Scorm12ErrorCode.InvalidArgumentError;
      return '';
    }

    if (SCORM_12_WRITE_ONLY.has(element)) {
      this.state.lastError = Scorm12ErrorCode.ElementIsWriteOnly;
      return '';
    }

    // Handle _count and _children keywords
    if (element.endsWith('._count')) {
      const value = this.state.cmiData.get(element);
      this.state.lastError = Scorm12ErrorCode.NoError;
      return value ?? '0';
    }

    if (element.endsWith('._children')) {
      this.state.lastError = Scorm12ErrorCode.NoError;
      return this.getChildren(element);
    }

    const value = this.state.cmiData.get(element);
    if (value === undefined) {
      this.state.lastError = Scorm12ErrorCode.NotImplementedError;
      return '';
    }

    this.state.lastError = Scorm12ErrorCode.NoError;
    return value;
  }

  /**
   * Store a value in the CMI data model.
   */
  LMSSetValue(element: string, value: string): string {
    if (!this.state.initialized) {
      this.state.lastError = Scorm12ErrorCode.NotInitialized;
      return 'false';
    }

    if (!element || typeof element !== 'string') {
      this.state.lastError = Scorm12ErrorCode.InvalidArgumentError;
      return 'false';
    }

    if (element.endsWith('._count') || element.endsWith('._children')) {
      this.state.lastError = Scorm12ErrorCode.InvalidSetValue;
      return 'false';
    }

    if (SCORM_12_READ_ONLY.has(element)) {
      this.state.lastError = Scorm12ErrorCode.ElementIsReadOnly;
      return 'false';
    }

    this.state.cmiData.set(element, value);
    this.state.lastError = Scorm12ErrorCode.NoError;
    return 'true';
  }

  /**
   * Persist data to the LMS (no-op for in-memory storage).
   */
  LMSCommit(_param: string): string {
    if (!this.state.initialized) {
      this.state.lastError = Scorm12ErrorCode.NotInitialized;
      return 'false';
    }

    this.state.lastError = Scorm12ErrorCode.NoError;
    return 'true';
  }

  /**
   * Return the last error code as a string.
   */
  LMSGetLastError(): string {
    return String(this.state.lastError);
  }

  /**
   * Return a human-readable description for an error code.
   */
  LMSGetErrorString(errorCode: string): string {
    const code = parseInt(errorCode, 10);
    return SCORM_12_ERROR_STRINGS[code] ?? 'Unknown error';
  }

  /**
   * Return diagnostic information for an error code.
   */
  LMSGetDiagnostic(errorCode: string): string {
    const code = errorCode ? parseInt(errorCode, 10) : this.state.lastError;
    return SCORM_12_ERROR_STRINGS[code] ?? `No diagnostic available for error code ${code}`;
  }

  // --- Accessors for external use ---

  /** Get a snapshot of all CMI data as a plain object. */
  getCmiData(): Record<string, string> {
    return Object.fromEntries(this.state.cmiData);
  }

  /** Bulk-load CMI data (e.g. restoring from a saved session). */
  setCmiData(data: Record<string, string>): void {
    for (const [key, value] of Object.entries(data)) {
      this.state.cmiData.set(key, value);
    }
  }

  /** Check if the API is currently initialized. */
  isInitialized(): boolean {
    return this.state.initialized;
  }

  // --- Private helpers ---

  private getChildren(element: string): string {
    const parent = element.replace('._children', '');
    const childrenMap: Record<string, string> = {
      'cmi.core': 'student_id,student_name,lesson_location,credit,lesson_status,entry,score,total_time,lesson_mode,exit,session_time',
      'cmi.core.score': 'raw,min,max',
      'cmi.student_data': 'mastery_score,max_time_allowed,time_limit_action',
      'cmi.student_preference': 'audio,language,speed,text',
    };
    return childrenMap[parent] ?? '';
  }
}
