import type { ScormApiState } from './types';
import { Scorm2004ErrorCode, SCORM_2004_ERROR_STRINGS } from './types';
import { getScorm2004Defaults, SCORM_2004_READ_ONLY, SCORM_2004_WRITE_ONLY } from './data-model';

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

    if (element.endsWith('._count')) {
      const value = this.state.cmiData.get(element);
      this.state.lastError = Scorm2004ErrorCode.NoError;
      return value ?? '0';
    }

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

  GetLastError(): string {
    return String(this.state.lastError);
  }

  GetErrorString(errorCode: string): string {
    const code = parseInt(errorCode, 10);
    return SCORM_2004_ERROR_STRINGS[code] ?? 'Unknown error';
  }

  GetDiagnostic(errorCode: string): string {
    const code = errorCode ? parseInt(errorCode, 10) : this.state.lastError;
    return SCORM_2004_ERROR_STRINGS[code] ?? `No diagnostic available for error code ${code}`;
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
      cmi: 'learner_id,learner_name,location,credit,completion_status,success_status,entry,score,total_time,mode,exit,session_time,suspend_data,launch_data,comments_from_learner,comments_from_lms,objectives,interactions,learner_preference',
      'cmi.score': 'raw,min,max,scaled',
      'cmi.learner_preference': 'audio_level,language,delivery_speed,audio_captioning',
    };
    return childrenMap[parent] ?? '';
  }
}
