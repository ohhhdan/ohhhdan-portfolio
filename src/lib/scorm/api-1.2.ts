import type { ScormApiState } from './types';
import { Scorm12ErrorCode, SCORM_12_ERROR_STRINGS } from './types';
import { getScorm12Defaults, SCORM_12_READ_ONLY, SCORM_12_WRITE_ONLY } from './data-model';

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

  LMSCommit(_param: string): string {
    if (!this.state.initialized) {
      this.state.lastError = Scorm12ErrorCode.NotInitialized;
      return 'false';
    }

    this.state.lastError = Scorm12ErrorCode.NoError;
    return 'true';
  }

  LMSGetLastError(): string {
    return String(this.state.lastError);
  }

  LMSGetErrorString(errorCode: string): string {
    const code = parseInt(errorCode, 10);
    return SCORM_12_ERROR_STRINGS[code] ?? 'Unknown error';
  }

  LMSGetDiagnostic(errorCode: string): string {
    const code = errorCode ? parseInt(errorCode, 10) : this.state.lastError;
    return SCORM_12_ERROR_STRINGS[code] ?? `No diagnostic available for error code ${code}`;
  }

  getCmiData(): Record<string, string> {
    return Object.fromEntries(this.state.cmiData);
  }

  setCmiData(data: Record<string, string>): void {
    for (const [key, value] of Object.entries(data)) {
      this.state.cmiData.set(key, value);
    }
  }

  isInitialized(): boolean {
    return this.state.initialized;
  }

  private getChildren(element: string): string {
    const parent = element.replace('._children', '');
    const childrenMap: Record<string, string> = {
      'cmi.core':
        'student_id,student_name,lesson_location,credit,lesson_status,entry,score,total_time,lesson_mode,exit,session_time',
      'cmi.core.score': 'raw,min,max',
      'cmi.student_data': 'mastery_score,max_time_allowed,time_limit_action',
      'cmi.student_preference': 'audio,language,speed,text',
    };
    return childrenMap[parent] ?? '';
  }
}
