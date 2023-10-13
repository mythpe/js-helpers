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
  QFileProps,
  QFileSlots,
  QImgProps,
  QInputProps,
  QInputSlots,
  QRadioProps,
  QRadioSlots,
  QSelectProps,
  QSelectSlots,
  QTimeProps,
  QToggleProps,
  QToggleSlots,
  QUploaderProps,
  QUploaderSlots
} from 'quasar'
import { FormActions } from 'vee-validate'
import { Ref, VNode } from 'vue'
import { ColStyleType, MColProps } from '../grid/models'

export declare type GenericFormValues = Record<any, unknown>;

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
  values: GenericFormValues
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
  resetForm: (state?: Partial<VeeFormState>) => void
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

export interface MInputProps extends MColProps, Omit<QInputProps, 'rules' | 'modelValue' | 'errors'>, MColProps {
  placeholder?: string | undefined;
  hidePlaceholder?: boolean | undefined;
  required?: boolean | undefined;
  hideRequired?: boolean | undefined;
  email?: boolean | undefined;
  rules?: string | string[] | undefined;
  errors?: Record<string, string[]>;
  modelValue?: string | number | null | symbol | undefined;
  /**
   * Set input to vie mode use q-field
   */
  viewMode?: boolean | undefined;
  viewModeValue?: any | undefined;
}

export interface MInputSlots extends QInputSlots {
  /**
   * Field main content
   */
  default: () => VNode[];
}

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
  name?: string | undefined;
  label?: string | undefined;
  placeholder?: string | undefined;
  hidePlaceholder?: boolean | undefined;
  required?: boolean | undefined;
  hideRequired?: boolean | undefined;
  email?: boolean | undefined;
  clearable?: boolean | undefined;
  loading?: boolean | undefined;
  rules?: string | string[] | undefined;
  errors?: Record<string, string[]>;
  modelValue: any;
}

export interface MFileSlots extends QFileSlots {
  /**
   * Field main content
   */
  default: () => VNode[];
}

export interface MPickerProps extends Omit<MInputProps, 'onUpdate:modelValue' | 'modelValue' | 'type'>, Omit<QDateProps, 'onUpdate:modelValue' | 'options'>, QTimeProps {
  modelValue: any;
  type?: 'date' | 'time';
  btnProps?: MBtnProps
}

export interface MPickerSlots extends MInputSlots {
  /**
   * Field main content
   */
  default: () => VNode[];
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

export interface MSelectProps extends MColProps, Omit<QSelectProps, 'rules'> {
  behavior?: 'default' | 'menu' | 'dialog' | undefined;
  emitValue?: boolean | undefined;
  mapOptions?: boolean | undefined;
  useInput?: boolean | undefined;
  name: string | undefined;
  label?: string | undefined;
  required?: boolean | undefined;
  hideRequired?: boolean | undefined;
  rules?: string | string[] | undefined;
  errors?: Record<string, string[]>;
  modelValue: any;
  options: any[];
  /**
   * Property of option which holds the 'value'; If using a function then for best performance, reference it from your scope and do not define it inline
   * Default value: value
   * @param option The current option being processed
   * @returns Value of the current option
   */
  optionValue?: ((option: string | any) => any) | string | undefined;
  /**
   * Property of option which holds the 'label'; If using a function then for best performance, reference it from your scope and do not define it inline
   * Default value: label
   * @param option The current option being processed
   * @returns Label of the current option
   */
  optionLabel?: ((option: string | any) => string) | string | undefined;
  search?: string | null | undefined;
  timeout?: number;
  autoSearch?: boolean | undefined;
  /**
   * Fetch Data on mounted
   */
  iniData?: boolean;
  /**
   * The options using ajax request to filter
   */
  noFilter?: boolean | undefined;
  /**
   * Set input to vie mode use q-field
   */
  viewMode?: boolean | undefined;
  viewModeValue?: any | undefined;
}

export interface MSelectSlots extends QSelectSlots {
  /**
   * Field main content
   */
  default: () => VNode[];
}

export interface MAxiosProps extends Omit<MSelectProps, 'options' | 'modelValue'> {
  modelValue?: any | undefined;
  requestWith?: string | undefined;
  options?: any[];
  service: ((config?: AxiosRequestConfig) => Promise<any>) | string;
  params?: Record<string, any> | undefined;
  guest?: boolean | undefined;
}

export interface MAxiosSlots extends MSelectSlots {
  /**
   * Field main content
   */
  default: () => VNode[];
}

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
}

export interface MCheckboxSlots extends QCheckboxSlots {
  /**
   * Field main content
   */
  default: () => VNode[];
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
}

export interface MToggleSlots extends QToggleSlots {
  top: (scope: VeeFieldFormScope) => VNode[];
  before: (scope: VeeFieldFormScope) => VNode[];
  default: () => VNode[];
  after: (scope: VeeFieldFormScope) => VNode[];
  bottom: (scope: VeeFieldFormScope) => VNode[];
}

export interface MFormSlots {
  default: (scope: { form: VeeFieldFormScope }) => VNode[];
}

export interface MFormProps {
  form?: Record<string, any>;
  errors?: Record<string, string[]>;
  formProps?: Record<string, any>;
}

export type MAvatarViewerItem = Record<string, string | File | any> | any

export interface MAvatarViewerProps extends QAvatarProps, MColProps {
  /**
   * Comma separated list of unique file type specifiers. Maps to 'accept' attribute of native input type=file element
   */
  accept?: string;
  images?: boolean;
  video?: boolean;
  pdf?: boolean;
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
  errors?: Record<string, string[]>;
  /**
   * Model of the component;
   * Must be FileList or Array if using 'multiple' prop;
   * Either use this property (along with a listener for 'update:modelValue' event) OR use v-model directive
   */
  modelValue?: MAvatarViewerItem;
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
}

export interface MAvatarViewerSlots extends QAvatarSlots {
  /**
   * Field main content
   */
  default: () => VNode[];
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
  modelValue: MUploaderMediaItem[];
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

export interface MEditorProps extends QEditorProps, MColProps {
  modelValue: string;
  minHeight?: string;
  name?: string;
  label?: string;
  errors?: Record<string, string[]>;
  dense?: boolean;
  toolbar?: readonly any[];
  fonts?: any;
}

export interface MEditorSlots extends QEditorSlots {
  /**
   * Editor default slot
   */
  default: () => VNode[];
}

export interface MRadioProps extends QRadioProps, MColProps {
  name: string;
  modelValue: any;
  val: any;
}

export interface MRadioSlots extends QRadioSlots {
  /**
   * Field main content
   */
  default: () => VNode[];
}

export interface MOtpProps extends Omit<QInputProps, 'modelValue'> {
  modelValue?: string | number;
  inputLength?: string | number;
  time?: string | number;
  hideTime?: boolean;
  hideSendAgain?: boolean;
  topLabel?: string | null | undefined;
}

export interface MOtpSlots extends QInputSlots {
  default: () => VNode[];
  'before-all': () => VNode[];
  'after-all': () => VNode[];
  'after-input': () => VNode[];
}

export {}
