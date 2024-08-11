/*
 * MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */

import { AxiosRequestConfig } from 'axios'
import {
  QAvatarProps,
  QAvatarSlots,
  QBtnProps,
  QBtnSlots,
  QCheckboxProps,
  QCheckboxSlots,
  QDateProps,
  QEditorProps,
  QEditorSlots,
  QFieldSlots,
  QFileProps,
  QFileSlots,
  QImgProps,
  QInputProps,
  QInputSlots,
  QRadioProps,
  QRadioSlots,
  QSelectProps,
  QTimeProps,
  QToggleProps,
  QToggleSlots,
  QUploaderProps,
  QUploaderSlots
} from 'quasar'
import type { FormActions, FormContext, FormMeta, Path, SubmissionHandler } from 'vee-validate'
import { ComputedGetter, MaybeRefOrGetter, Ref, UnwrapRef, VNode } from 'vue'
import { ColStyleType, MColProps, ViewModeProps } from '../grid/models'

export type InputRulesContext = string | Record<string, any> | undefined;
export type InputErrorsContext = string[];
export type InputFormErrorsContext = Record<string, InputErrorsContext> | undefined;

export type InputHelpProps = {
  /**
   * Information text with Icon.
   */
  help?: string;
  /**
   * Auto help Icon.
   */
  helpIcon?: string;
  /**
   * Div Props of help.
   */
  helpProps?: Record<string, any>;
}
export type InputHelpSlots = {
  /**
   * VNode bottom of input & before 'bottom-input slot'.
   */
  'help': () => VNode[];
}

export type BaseInputFormProps = {
  name: string;
  modelValue?: any;
  placeholder?: string | undefined;
  hidePlaceholder?: boolean | undefined;
  required?: boolean | undefined;
  hideRequired?: boolean | undefined;
  // email?: boolean | undefined;
  // mobile?: boolean | string | number | undefined;
  rules?: InputRulesContext;
  errors?: InputErrorsContext;
  formErrors?: InputFormErrorsContext;
  autocomplete?: boolean | string | undefined;
  topLabel?: boolean | undefined;
  caption?: string | null | undefined;
}
export type BaseInputsProps = ViewModeProps & MColProps & InputHelpProps & BaseInputFormProps;

export type BaseInputsSlots = InputHelpSlots & {
  /**
   * Field main content
   */
  default: () => VNode[];
  /**
   * VNode top of input & top of 'top label slot'.
   */
  'top-input': () => VNode[];
  /**
   * The label top on input
   */
  'top-label': () => VNode[];
  /**
   * VNode top of input & after top label.
   */
  caption: () => VNode[];
  /**
   * VNode bottom of input.
   */
  'bottom-input': () => VNode[];
}

export declare type GenericFormValues = Record<any, any>;

export interface VeeFormFormMeta {
  touched: boolean;
  dirty: boolean;
  valid: boolean;
  validated: boolean;
  pending: boolean;
  initialValues?: GenericFormValues;
}

export interface VeeFormSubmissionContext<TValues extends GenericFormValues = GenericFormValues> extends FormActions<TValues> {
  evt?: Event;
  controlledValues: Partial<TValues>;
}

export interface VeeFormState<TValues extends GenericFormValues = GenericFormValues> {
  values: TValues;
  errors: Partial<Record<keyof TValues, string | undefined>>;
  touched: Partial<Record<keyof TValues, boolean>>;
  submitCount: number;
}

export type VeeFieldFormScope = {
  errors: Record<string, string>;
  isSubmitting: Ref<boolean>;
  meta: VeeFormFormMeta;
  values: GenericFormValues | any;
  setFieldError: (field: string, message: string) => void
  setErrors: (fields: Record<string, string>) => void
  setFieldValue: (field: string, value: any) => void
  setValues: (fields: Record<string, any>) => void
  setFieldTouched: (field: string, isTouched: boolean) => void
  setTouched: (fields: Record<string, boolean>) => void
  validate: () => Promise<{ valid: boolean; errors: Record<string, string> }>
  validateField: (field: string) => Promise<{ valid: boolean; errors: string[] }>
  handleSubmit: (evt: Event, cb: (values: Record<string, any>, ctx: VeeFormSubmissionContext) => any) => Promise<void>
  submitForm: (evt: Event) => void
  submitCount: number
  handleReset: () => void
  resetForm: (state?: Partial<VeeFormState>) => void;
}

export interface MBtnProps extends QBtnProps {
  color?: string | undefined
  noCaps?: boolean | undefined
}

export interface MBtnSlots extends QBtnSlots {
  /**
   * Use for custom content, instead of relying on 'icon' and 'label' props
   */
  default: () => VNode[];
  /**
   * Override the default QSpinner when in 'loading' state
   */
  loading: () => VNode[];
}

export type MInputProps = Omit<QInputProps, 'rules' | 'name'> & BaseInputsProps

export type MPasswordProps = MInputProps & {
  /**
   * icon prepend it to password input.
   */
  icon?: boolean | undefined;
  /**
   * toggle password append icon.
   */
  noToggle?: boolean | undefined;
}

export type MInputSlots = QInputSlots & QFieldSlots & BaseInputsSlots

export interface MFileProps extends MColProps, Omit<QFileProps, 'rules'> {
  auto?: boolean | undefined;
  col?: ColStyleType;
  xs?: ColStyleType;
  sm?: ColStyleType;
  md?: ColStyleType;
  lg?: ColStyleType;
  xl?: ColStyleType;
  accept?: string | undefined;
  images?: boolean | undefined;
  video?: boolean | undefined;
  pdf?: boolean | undefined;
  excel?: boolean | undefined;
  outlined?: boolean | undefined;
  standout?: boolean | string | undefined;
  borderless?: boolean | undefined;
  stackLabel?: boolean | undefined;
  filled?: boolean | undefined;
  dense?: boolean | undefined;
  hideBottomSpace?: boolean | undefined;
  name: string;
  label?: string | undefined;
  placeholder?: string | undefined;
  hidePlaceholder?: boolean | undefined;
  required?: boolean | undefined;
  hideRequired?: boolean | undefined;
  email?: boolean | undefined;
  clearable?: boolean | undefined;
  loading?: boolean | undefined;
  rules?: InputRulesContext;
  errors?: Record<string, string[]>;
  modelValue: any;
  /**
   * Set input to vie mode use q-field
   */
  viewMode?: boolean | undefined;
  viewModeValue?: any | undefined;
  topLabel?: boolean | undefined;
  caption?: string | null | undefined;
}

export interface MFileSlots extends QFileSlots {
  /**
   * Field main content
   */
  default: () => VNode[];
  'top-label': () => VNode[];
  caption: () => VNode[];
  bottom: () => VNode[];
}

export interface MPickerProps extends Omit<MInputProps, 'modelValue' | 'type'>, Omit<QDateProps, 'modelValue' | 'options'>, Omit<QTimeProps, 'modelValue'> {
  modelValue: any;
  type?: 'date' | 'time';
  btnProps?: MBtnProps;
  range?: boolean;
}

export interface MPickerSlots extends MInputSlots {
  /**
   * Field main content
   */
  default: () => VNode[];
  'top-label': () => VNode[];
  caption: () => VNode[];
}

export interface MDateProps extends MPickerProps {
  modelValue: any;
}

export interface MDateSlots extends MPickerSlots {
  /**
   * Field main content
   */
  default: () => VNode[];
}

export interface MTimeProps extends MPickerProps {
  modelValue: any
}

export interface MTimeSlots extends MPickerSlots {
  /**
   * Field main content
   */
  default: () => VNode[];
}

export type MSelectProps = Omit<QSelectProps, 'rules' | 'name' | 'modelValue'> & BaseInputsProps & {
  /**
   * Input search functionality. useInput prop for this feature.
   */
  search?: string | null | undefined;
  /**
   * Minimum characters to start searching. Default is 1.
   */
  searchLength?: string | number;
  /**
   * hide the default empty list message.
   */
  hideEmptyList?: boolean | undefined;
  /**
   * Disable filter functionality.
   */
  noFilter?: boolean | undefined;
  /**
   * Set mode of component to axios of filter & search.
   * if set to true, component will fetch data from api and don't do filter functionality.
   */
  axiosMode?: boolean | undefined;
  /**
   * Fetch Data on mounted
   */
  // iniData?: boolean;
}
export type MSelectSlots = QInputSlots & QFieldSlots & BaseInputsSlots

export type MAxiosProps = Omit<MSelectProps, 'options' | 'axiosMode'> & {
  /**
   * Request method. Default is GET.
   */
  service: ((config?: AxiosRequestConfig) => Promise<any>) | string;
  /**
   * Send request as guest request. If false, send request as authenticated user. Default is true.
   */
  guest?: MaybeRefOrGetter<boolean> | ComputedGetter<boolean>;
  /**
   * Request params.
   */
  params?: MaybeRefOrGetter<Record<string, any>> | ComputedGetter<Record<string, any>>;
  /**
   * Request relations.
   */
  requestWith?: MaybeRefOrGetter<string> | ComputedGetter<string> | undefined;
  /**
   * Component items.
   */
  items?: any[];
  /**
   *  The name of the attribute to be used as a label
   */
  attributeName?: string;
}
export type MAxiosSlots = MSelectSlots

export interface MCheckboxProps extends QCheckboxProps {
  auto?: boolean | undefined;
  col?: ColStyleType;
  xs?: ColStyleType;
  sm?: ColStyleType;
  md?: ColStyleType;
  lg?: ColStyleType;
  xl?: ColStyleType;
  name: string;
  modelValue: any;
  val?: any | undefined;
  label?: any;
  noLabel?: boolean;
  required?: boolean;
  rules?: InputRulesContext;
  hideRequired?: boolean;
  viewMode?: boolean;
  placeholder?: any;
  errors?: Record<string, string[]>;
  colProps?: MColProps;
}

export interface MCheckboxSlots extends QCheckboxSlots {
  default: () => VNode[];
  top: () => VNode[];
  before: () => VNode[];
  beforeField: () => VNode[];
  after: () => VNode[];
  afterField: () => VNode[];
  bottom: () => VNode[];
  left: () => VNode[];
  right: () => VNode[];
}

export interface MToggleProps extends MColProps, Omit<QToggleProps, 'modelValue'> {
  auto?: boolean | undefined;
  col?: ColStyleType;
  xs?: ColStyleType;
  sm?: ColStyleType;
  md?: ColStyleType;
  lg?: ColStyleType;
  xl?: ColStyleType;
  borderless?: boolean | undefined;
  clearable?: boolean | undefined;
  dense?: boolean | undefined;
  modelValue?: any | undefined;
  val?: any | undefined;
  name?: string | undefined;
  label?: string | undefined;
  activeLabel?: string;
  inactiveLabel?: string;
  trueValue?: any | undefined;
  falseValue?: any | undefined;
  color?: string | undefined;
  checkedIcon?: string | undefined;
  uncheckedIcon?: string | undefined;
  toggleIndeterminate?: boolean | undefined;
  statusLabels?: boolean | undefined;
  rules?: InputRulesContext;
  required?: boolean;
  hideRequired?: boolean;
  viewMode?: boolean;
  placeholder?: any;
  errors?: Record<string, string[]>;
  hint?: string;
}

export interface MToggleSlots extends QToggleSlots {
  top: (scope: VeeFieldFormScope) => VNode[];
  before: (scope: VeeFieldFormScope) => VNode[];
  default: () => VNode[];
  after: (scope: VeeFieldFormScope) => VNode[];
  bottom: (scope: VeeFieldFormScope) => VNode[];
  hint: () => VNode[];
}

type GenericObject = Record<string, any>;
type FormErrors<TValues extends GenericObject> = Partial<Record<Path<TValues>, string | undefined>>;
type FormSlotProps =
  UnwrapRef<Pick<FormContext, 'meta' | 'errors' | 'errorBag' | 'values' | 'isSubmitting' | 'isValidating' | 'submitCount' | 'validate' | 'validateField' | 'handleReset' | 'setErrors' | 'setFieldError' | 'setFieldValue' | 'setValues' | 'setFieldTouched' | 'setTouched' | 'resetForm' | 'resetField' | 'controlledValues'>>
  & {
  handleSubmit: (evt: Event | SubmissionHandler, onSubmit?: SubmissionHandler) => Promise<unknown>;
  submitForm (evt?: Event): void;
  getValues<TValues extends GenericObject = GenericObject> (): TValues;
  getMeta<TValues extends GenericObject = GenericObject> (): FormMeta<TValues>;
  getErrors<TValues extends GenericObject = GenericObject> (): FormErrors<TValues>;
};

export interface MFormSlots {
  default: (scope: FormSlotProps) => VNode[];
}

export interface MFormProps {
  form?: Record<string, any>;
  errors?: Record<string, string[]>;
  formProps?: Record<string, any>;
}

export type MAvatarViewerModelValue = File | null | undefined;

export type MAvatarViewerProps = QAvatarProps & MColProps & {
  /**
   * Comma separated list of unique file type specifiers. Maps to 'accept' attribute of native input type=file element
   */
  accept?: string;
  /**
   * Add accept file type.
   */
  images?: boolean;
  /**
   * Add accept video type.
   */
  video?: boolean;
  /**
   * Add accept pdf type.
   */
  pdf?: boolean;
  /**
   * Add accept excel type.
   */
  excel?: boolean;
  /**
   * Show text if no image
   */
  avatarText?: string;
  /**
   * How the image will fit into the container; Equivalent of the object-fit prop; Can be coordinated with 'position' prop
   * Default value: cover
   */
  fit?: QImgProps['fit'];
  /**
   * Can clear the input & not required
   */
  clearable?: boolean;
  /**
   * The label that will appear above the image
   */
  label?: string;
  /**
   * List of errors contains prop name { [name]: ['error1','error2']}
   */
  errors?: Record<string, string[] | string | undefined>;
  /**
   * Model of the component;
   * Must be FileList or Array if using 'multiple' prop;
   * Either use this property (along with a listener for 'update:modelValue' event) OR use v-model directive
   */
  modelValue?: MAvatarViewerModelValue;
  /**
   * The name of the file for the image used and the field.
   * Example: name='avatar' { avatar: https://4myth.com, avatarBlob: Blob, avatarRemoved: !0 | !1 }
   */
  name?: string;
  /**
   * Avatar url.
   * (along with a listener for 'update:url' event) OR use v-model directive
   */
  url?: string;
  /**
   * value if user remove the image
   * (along with a listener for 'update:removed' event) OR use v-model directive
   */
  removed?: boolean;
  /**
   * Input hint.
   */
  hint?: string;
  hintProps?: Record<string, any>;
  caption?: string;
  captionProps?: Record<string, any>;
}

export interface MAvatarViewerSlots extends QAvatarSlots {
  /**
   * Field main content
   */
  default: () => VNode[];
  hint: () => VNode[];
}

export type MUploaderMediaItem = {
  id: number;
  value: number;
  name: string;
  file_name: string;
  type: string;
  size: number;
  size_to_string: string;
  url: string;
  download_url: string;
  icon: string;
  description: string;
  attachment_type: string;
  attachment_type_id: number;
  attachment_type_id_to_string: string;
  user_id: number | null;
  user_id_to_string: string;
}

export type MUploaderServiceType = string | {
  /**
   * Get Attachments url
   */
  getUploadAttachmentsUrl (modelId: string | number): string;
  /** The url to which the files will be uploaded to */
  uploadAttachments: (modelId: string | number, files: readonly File[]) => string;
  /**
   * Method axios to delete files
   * @param files
   */
  deleteAttachment: (media: MUploaderMediaItem, config?: AxiosRequestConfig) => Promise<any>;
}

export interface MUploaderProps extends Omit<QUploaderProps, 'formFields' | 'headers' | 'url'>, MColProps {
  /**
   * Put component in disabled mode
   */
  disable?: boolean;
  /**
   * Put component in readonly mode
   */
  readonly?: boolean;
  /**
   * Comma separated list of unique file type specifiers. Maps to 'accept' attribute of native input type=file element
   */
  accept?: string;
  /** Support for uploading images */
  images?: boolean;
  /** Support for uploading videos  */
  video?: boolean;
  /** Support for uploading pdf  */
  pdf?: boolean;
  /** Support for uploading excel  */
  excel?: boolean;
  /**
   * Upload files immediately when added
   */
  autoUpload?: boolean;
  /**
   * Field name for each file upload; This goes into the following header: 'Content-Disposition: form-data; name="__HERE__"; filename="somefile.png"; If using a function then for best performance, reference it from your scope and do not define it inline
   * Default value: (file) => file.name
   * @param files The current file being processed
   * @returns Field name for the current file upload
   */
  fieldName?: string | ((files: File) => string);
  /**
   * Collection send to API
   */
  collection?: string | number | symbol;
  /**
   * Field Attachment Type
   */
  attachmentType?: string | number | symbol;
  /**
   * return attachments after upload; default current collection name;
   */
  returnType?: 'all' | 'current' | undefined;
  /**
   * Object with additional fields definitions (used by Form to be uploaded);
   */
  formFields?: Record<string, any>;
  /**
   * Extra headers
   */
  headers?: Record<string, any>;
  /**
   * Label for the uploader
   */
  label?: string;
  /** The Attachments list */
  modelValue: MUploaderMediaItem[] | any[];
  /**
   *  Hide delete media items from uploader, no delete media For API
   */
  hideDeleteMedia?: boolean;
  /**
   * User APi service for upload & delete
   */
  service: MUploaderServiceType;
  /**
   * The ID of model will use in attachments
   */
  modelId: string | number;
  uploading?: boolean | undefined;
  readonly useQuasarLoading?: boolean | undefined;
  defaultFileIcon?: string | undefined;
  deleteMediaIcon?: string | undefined;
  uploadFilesIcon?: string | undefined;
  pickFilesIcon?: string | undefined;
  removeUploadedIcon?: string | undefined;
  removeQueuedIcon?: string | undefined;
  abortUploadIcon?: string | undefined;
  downloadFileIcon?: string | undefined;
  errorsIcon?: string | undefined;
  iconsSize?: string | undefined;
  displayMode?: 'list' | 'card' | undefined;
  shadow?: string | undefined;
}

export interface MUploaderSlots extends QUploaderSlots {
  /**
   * Field main content
   */
  default: () => VNode[];
  /**
   * list of item will be display
   */
  // list: (scope: { item: MUploaderMediaItem, index: number }) => VNode[];
  /**
   * list of item will be display
   */
  'item-list': (scope: { item: MUploaderMediaItem, index: number }) => VNode[];
}

export type MUploaderXhrInfo = { files: readonly any[]; xhr: any; }

export interface MEditorProps extends Omit<QEditorProps, 'modelValue'>, MColProps {
  modelValue: string | any;
  name: string;
  label?: string;
  hint?: string;
  rules?: InputRulesContext;
  required?: boolean;
  hideRequired?: boolean;
  viewMode?: boolean;
  errors?: Record<string, string[]>;
  caption?: string | null | undefined;
}

export interface MEditorSlots extends QEditorSlots {
  /**
   * Editor default slot
   */
  default: () => VNode[];
  label: () => VNode[];
  caption: () => VNode[];
  hint: () => VNode[];
}

export interface MRadioProps extends Omit<QRadioProps, 'name' | 'modelValue' | 'val' | 'label'>, MColProps {
  name: string;
  modelValue: any;
  val: any;
  label?: string | null | undefined;
  noLabel?: boolean;
  required?: boolean;
  rules?: InputRulesContext;
  hideRequired?: boolean;
  viewMode?: boolean;
  placeholder?: any;
  errors?: Record<string, string[]>;
  colProps?: MColProps;
}

export interface MRadioSlots extends QRadioSlots {
  default: () => VNode[];
  top: () => VNode[];
  before: () => VNode[];
  after: () => VNode[];
  bottom: () => VNode[];
  left: () => VNode[];
  right: () => VNode[];
}

export interface MOtpProps extends Omit<QInputProps, 'modelValue'> {
  modelValue?: string | number;
  inputLength?: string | number;
  numeric?: boolean;
  time?: string | number;
  hideTime?: boolean;
  hideSendAgain?: boolean;
  topLabel?: string | null | undefined;
  topLabelProps?: any | undefined;
  errors?: string[];
}

export interface MOtpSlots extends QInputSlots {
  default: () => VNode[];
  'before-all': () => VNode[];
  'after-all': () => VNode[];
  'after-input': () => VNode[];
}

export type MInputLabelProps = Record<string, any>;

export interface MInputLabelSlots extends QInputSlots {
  default: () => VNode[];
}

export {}
