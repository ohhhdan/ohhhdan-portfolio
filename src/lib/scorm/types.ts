// SCORM version discriminator
export type ScormVersion = '1.2' | '2004';

// Parsed SCORM package metadata
export interface ScormPackage {
  id: string;
  title: string;
  version: ScormVersion;
  description: string;
  launchUrl: string;
  manifestPath: string;
}

// Runtime API state holding CMI data model values
export interface ScormApiState {
  initialized: boolean;
  terminated: boolean;
  lastError: number;
  cmiData: Map<string, string>;
}

// SCORM 1.2 error codes
export enum Scorm12ErrorCode {
  NoError = 0,
  GeneralException = 101,
  InvalidArgumentError = 201,
  ElementCannotHaveChildren = 202,
  ElementNotAnArray = 203,
  NotInitialized = 301,
  NotImplementedError = 401,
  InvalidSetValue = 402,
  ElementIsReadOnly = 403,
  ElementIsWriteOnly = 404,
  IncorrectDataType = 405,
}

// SCORM 2004 error codes
export enum Scorm2004ErrorCode {
  NoError = 0,
  GeneralException = 101,
  GeneralInitializationFailure = 102,
  AlreadyInitialized = 103,
  ContentInstanceTerminated = 104,
  GeneralTerminationFailure = 111,
  TerminationBeforeInitialization = 112,
  TerminationAfterTermination = 113,
  RetrieveDataBeforeInitialization = 122,
  RetrieveDataAfterTermination = 123,
  StoreDataBeforeInitialization = 132,
  StoreDataAfterTermination = 133,
  CommitBeforeInitialization = 142,
  CommitAfterTermination = 143,
  GeneralArgumentError = 201,
  UndefinedDataModelElement = 301,
  UnimplementedDataModelElement = 401,
  DataModelElementValueNotInitialized = 403,
  DataModelElementIsReadOnly = 404,
  DataModelElementIsWriteOnly = 405,
  DataModelElementTypeMismatch = 406,
  DataModelElementValueOutOfRange = 407,
  DataModelDependencyNotEstablished = 408,
}

// Error description maps
export const SCORM_12_ERROR_STRINGS: Record<number, string> = {
  [Scorm12ErrorCode.NoError]: 'No error',
  [Scorm12ErrorCode.GeneralException]: 'General exception',
  [Scorm12ErrorCode.InvalidArgumentError]: 'Invalid argument error',
  [Scorm12ErrorCode.ElementCannotHaveChildren]: 'Element cannot have children',
  [Scorm12ErrorCode.ElementNotAnArray]: 'Element not an array - cannot have count',
  [Scorm12ErrorCode.NotInitialized]: 'Not initialized',
  [Scorm12ErrorCode.NotImplementedError]: 'Not implemented error',
  [Scorm12ErrorCode.InvalidSetValue]: 'Invalid set value, element is a keyword',
  [Scorm12ErrorCode.ElementIsReadOnly]: 'Element is read only',
  [Scorm12ErrorCode.ElementIsWriteOnly]: 'Element is write only',
  [Scorm12ErrorCode.IncorrectDataType]: 'Incorrect data type',
};

export const SCORM_2004_ERROR_STRINGS: Record<number, string> = {
  [Scorm2004ErrorCode.NoError]: 'No error',
  [Scorm2004ErrorCode.GeneralException]: 'General exception',
  [Scorm2004ErrorCode.GeneralInitializationFailure]: 'General initialization failure',
  [Scorm2004ErrorCode.AlreadyInitialized]: 'Already initialized',
  [Scorm2004ErrorCode.ContentInstanceTerminated]: 'Content instance terminated',
  [Scorm2004ErrorCode.GeneralTerminationFailure]: 'General termination failure',
  [Scorm2004ErrorCode.TerminationBeforeInitialization]: 'Termination before initialization',
  [Scorm2004ErrorCode.TerminationAfterTermination]: 'Termination after termination',
  [Scorm2004ErrorCode.RetrieveDataBeforeInitialization]: 'Retrieve data before initialization',
  [Scorm2004ErrorCode.RetrieveDataAfterTermination]: 'Retrieve data after termination',
  [Scorm2004ErrorCode.StoreDataBeforeInitialization]: 'Store data before initialization',
  [Scorm2004ErrorCode.StoreDataAfterTermination]: 'Store data after termination',
  [Scorm2004ErrorCode.CommitBeforeInitialization]: 'Commit before initialization',
  [Scorm2004ErrorCode.CommitAfterTermination]: 'Commit after termination',
  [Scorm2004ErrorCode.GeneralArgumentError]: 'General argument error',
  [Scorm2004ErrorCode.UndefinedDataModelElement]: 'Undefined data model element',
  [Scorm2004ErrorCode.UnimplementedDataModelElement]: 'Unimplemented data model element',
  [Scorm2004ErrorCode.DataModelElementValueNotInitialized]: 'Data model element value not initialized',
  [Scorm2004ErrorCode.DataModelElementIsReadOnly]: 'Data model element is read only',
  [Scorm2004ErrorCode.DataModelElementIsWriteOnly]: 'Data model element is write only',
  [Scorm2004ErrorCode.DataModelElementTypeMismatch]: 'Data model element type mismatch',
  [Scorm2004ErrorCode.DataModelElementValueOutOfRange]: 'Data model element value out of range',
  [Scorm2004ErrorCode.DataModelDependencyNotEstablished]: 'Data model dependency not established',
};
