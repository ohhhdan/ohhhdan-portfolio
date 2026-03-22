import type { ScormApiState } from './types';
import { Scorm2004ErrorCode, SCORM_2004_ERROR_STRINGS } from './types';
import { getScorm2004Defaults, SCORM_2004_READ_ONLY, SCORM_2004_WRITE_ONLY } from './data-model';

/**
 * SCORM 2004 Runtime API implementation.
 *
 * Implements the 8 required API functions:
 *   Initialize, Terminate, GetValue, SetValue, Commit,
 *   GetLastError, GetErrorString, GetDiagnostic
 *
 * All functions return string values ("true"/"false") per the SCORM 2004 spec.
 */
export class Scorm2004Api {
  private state: ScormApiState;

  constructor() {
    this.state = {
      initialized: false,
      terminated: false,
      lastError: Scorm2004ErrorCode.NoError,
      cmiData: getScorm2004Defaults(),
    };
  }

  /**
   * Initialize communication with the LMS.
   */
  Initialize(param: string): string {
    if (param !== '') {
      this.state.lastError = Scorm2004ErrorCode.GeneralArgumentError;
      return 'false';
    }

    if (this.state.terminated) {
      this.state.lastError = Scorm2004ErrorCode.ContentInstanceTerminated;
      return 'false';
    }

    if (this.state.initialized) {
      this.state.lastError = Scorm2004ErrorCode.AlreadyInitialized;
      return 'false';
    }

    this.state.initialized = true;
    this.state.lastError = Scorm2004ErrorCode.NoError;
    return 'true';
  }

  /**
   * Terminate communication with the LMS.
   */
  Terminate(param: string): string {
    if (param !== '') {
      this.state.lastError = Scorm2004ErrorCode.GeneralArgumentError;
      return 'false';
    }

    if (!this.state.initialized) {
      this.state.lastError = Scorm2004ErrorCode.TerminationBeforeInitialization;
      return 'false';
    }

    if (this.state.terminated) {
      this.state.lastError = Scorm2004ErrorCode.TerminationAfterTermination;
      return 'false';
    }

    this.state.initialized = false;
    this.state.terminated = true;
    this.state.lastError = Scorm2004ErrorCode.NoError;
    return 'true';
  }

  /**
   * Retrieve a value from the CMI data model.
   */
  GetValue(element: string): string {
    if (!this.state.initialized) {
      this.state.lastError = this.state.terminated
        ? Scorm2004ErrorCode.RetrieveDataAfterTermination
        : Scorm2004ErrorCode.RetrieveDataBeforeInitialization;
      return '';
    }

    if (!element || typeof element !== 'string') {
      this.state.lastError = Scorm2004ErrorCode.GeneralArgumentError;
      return '';
    }

    if (SCORM_2004_WRITE_ONLY.has(element)) {
      this.state.lastError = Scorm2004ErrorCode.DataModelElementIsWriteOnly;
      return '';
    }

    // Handle _count keywords
    if (element.endsWith('._count')) {
      const value = this.state.cmiData.get(element);
      this.state.lastError = Scorm2004ErrorCode.NoError;
      return value ?? '0';
    }

    // Handle _children keywords
    if (element.endsWith('._children')) {
      this.state.lastError = Scorm2004ErrorCode.NoError;
      return this.getChildren(element);
    }

    const value = this.state.cmiData.get(element);
    if (value === undefined) {
      this.state.lastError = Scorm2004ErrorCode.UndefinedDataModelElement;
      return '';
    }

    this.state.lastError = Scorm2004ErrorCode.NoError;
    return value;
  }

  /**
   * Store a value in the CMI data model.
   */
  SetValue(element: string, value: string): string {
    if (!this.state.initialized) {
      this.state.lastError = this.state.terminated
        ? Scorm2004ErrorCode.StoreDataAfterTermination
        : Scorm2004ErrorCode.StoreDataBeforeInitialization;
      return 'false';
    }

    if (!element || typeof element !== 'string') {
      this.state.lastError = Scorm2004ErrorCode.GeneralArgumentError;
      return 'false';
    }

    if (element.endsWith('._count') || element.endsWith('._children')) {
      this.state.lastError = Scorm2004ErrorCode.GeneralArgumentError;
      return 'false';
    }

    if (SCORM_2004_READ_ONLY.has(element)) {
      this.state.lastError = Scorm2004ErrorCode.DataModelElementIsReadOnly;
      return 'false';
    }

    this.state.cmiData.set(element, value);
    this.state.lastError = Scorm2004ErrorCode.NoError;
    return 'true';
  }

  /**
   * Persist data to the LMS (no-op for in-memory storage).
   */
  Commit(param: string): string {
    if (param !== '') {
      this.state.lastError = Scorm2004ErrorCode.GeneralArgumentError;
      return 'false';
    }

    if (!this.state.initialized) {
      this.state.lastError = this.state.terminated
        ? Scorm2004ErrorCode.CommitAfterTermination
        : Scorm2004ErrorCode.CommitBeforeInitialization;
      return 'false';
    }

    this.state.lastError = Scorm2004ErrorCode.NoError;
    return 'true';
  }

  /**
   * Return the last error code as a string.
   */
  GetLastError(): string {
    return String(this.state.lastError);
  }

  /**
   * Return a human-readable description for an error code.
   */
  GetErrorString(errorCode: string): string {
    const code = parseInt(errorCode, 10);
    return SCORM_2004_ERROR_STRINGS[code] ?? 'Unknown error';
  }

  /**
   * Return diagnostic information for an error code.
   */
  GetDiagnostic(errorCode: string): string {
    const code = errorCode ? parseInt(errorCode, 10) : this.state.lastError;
    return SCORM_2004_ERROR_STRINGS[code] ?? `No diagnostic available for error code ${code}`;
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
      'cmi': 'learner_id,learner_name,location,credit,completion_status,success_status,entry,score,total_time,mode,exit,session_time,suspend_data,launch_data,comments_from_learner,comments_from_lms,objectives,interactions,learner_preference',
      'cmi.score': 'raw,min,max,scaled',
      'cmi.learner_preference': 'audio_level,language,delivery_speed,audio_captioning',
    };
    return childrenMap[parent] ?? '';
  }
}
