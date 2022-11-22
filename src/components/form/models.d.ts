/*
 * MyTh Ahmed Faiz Copyright © 2022 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * https://www.4myth.com
 */

import { AxiosInstance, AxiosResponse } from 'axios'
import {
  QAvatarProps,
  QAvatarSlots,
  QBtnProps,
  QBtnSlots,
  QCheckboxProps,
  QCheckboxSlots,
  QFileProps,
  QFileSlots,
  QImgProps,
  QInputProps,
  QInputSlots,
  QSelectProps,
  QSelectSlots,
  QToggleProps,
  QToggleSlots,
  QUploaderProps,
  QUploaderSlots
} from 'quasar'
import { FormActions } from 'vee-validate'
import { Ref, UnwrapNestedRefs, VNode } from 'vue'
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

export interface MInputProps extends MColProps, Omit<QInputProps, 'rules'> {
  auto?: boolean | undefined;
  col?: ColStyleType;
  xs?: ColStyleType;
  sm?: ColStyleType;
  md?: ColStyleType;
  lg?: ColStyleType;
  xl?: ColStyleType;
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

export interface MPickerProps extends MInputProps {
  type: 'date' | 'time'
}

export interface MPickerSlots extends MInputSlots {
  /**
   * Field main content
   */
  default: () => VNode[];
}

export interface MDateProps extends MInputProps {
  modelValue: any
}

export interface MDateSlots extends MPickerSlots {
  /**
   * Field main content
   */
  default: () => VNode[];
}

export interface MTimeProps extends MInputProps {
  modelValue: any
}

export interface MTimeSlots extends MPickerSlots {
  /**
   * Field main content
   */
  default: () => VNode[];
}

export interface MSelectProps extends MColProps, Omit<QSelectProps, 'rules'> {
  auto?: boolean | undefined;
  col?: ColStyleType;
  xs?: ColStyleType;
  sm?: ColStyleType;
  md?: ColStyleType;
  lg?: ColStyleType;
  xl?: ColStyleType;
  behavior?: 'default' | 'menu' | 'dialog' | undefined;
  borderless?: boolean | undefined;
  dense?: boolean | undefined;
  emitValue?: boolean | undefined;
  filled?: boolean | undefined;
  hideBottomSpace?: boolean | undefined;
  inputDebounce?: number | string | undefined;
  mapOptions?: boolean | undefined;
  optionLabel?: ((option: string | any) => string) | string | undefined;
  optionsDense?: boolean | undefined;
  outlined?: boolean | undefined;
  stackLabel?: boolean | undefined;
  standout?: boolean | string | undefined;
  useInput?: boolean | undefined;
  name: string | undefined;
  label?: string | undefined;
  required?: boolean | undefined;
  hideRequired?: boolean | undefined;
  clearable?: boolean | undefined;
  loading?: boolean | undefined;
  rules?: string | string[] | undefined;
  errors?: Record<string, string[]>;
  modelValue: any;
  options: any[];
}

export interface MSelectSlots extends QSelectSlots {
  /**
   * Field main content
   */
  default: () => VNode[];
}

export interface MAxiosProps extends Omit<MSelectProps, 'options' | 'modelValue'> {
  modelValue?: any | undefined;
  options?: any[];
  service: string | (() => Promise<AxiosInstance>);
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
  default: () => VNode[];
}

export interface MFormProps {
  form: UnwrapNestedRefs<Record<string, any>>;
  errors: UnwrapNestedRefs<Record<string, string[]>>;
}

export type MAvatarViewerItem = Record<string, string | File | any> | any

export interface MAvatarViewerProps extends QAvatarProps {
  /**
   * Model of the component; Must be FileList or Array if using 'multiple' prop; Either use this property (along with a listener for 'update:modelValue' event) OR use v-model directive
   */
  modelValue: MAvatarViewerItem;
  /**
   * Comma separated list of unique file type specifiers. Maps to 'accept' attribute of native input type=file element
   */
  accept?: string | undefined;
  /**
   * The value that will be used to modify the image
   */
  item?: MAvatarViewerItem;
  /**
   * List of errors contains prop name { [name]: ['error1','error2']}
   */
  errors: Record<string, any[]> | undefined;
  /**
   * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
   */
  size?: string | undefined;
  /**
   * The name of the file for the image used and the field
   */
  name?: string;
  /**
   * Avatar url
   */
  url?: string;
  /**
   * Show text if no image
   */
  avatarText?: string | undefined;
  /**
   * How the image will fit into the container; Equivalent of the object-fit prop; Can be coordinated with 'position' prop
   * Default value: cover
   */
  fit?: QImgProps['fit'];
  /**
   * Can clear the input & not required
   */
  clearable?: boolean | undefined;
  /**
   * The label that will appear above the image
   */
  label?: string | undefined;
  /**
   * Applies a small standard border-radius for a squared shape of the component
   */
  rounded?: boolean | undefined;
}

export interface MAvatarViewerSlots extends QAvatarSlots {
  /**
   * Field main content
   */
  default: () => VNode[];
}

export interface MUploaderProps extends Omit<QUploaderProps, 'formFields'> {
  auto?: boolean | undefined;
  col?: ColStyleType;
  xs?: ColStyleType;
  sm?: ColStyleType;
  md?: ColStyleType;
  lg?: ColStyleType;
  xl?: ColStyleType;
  /**
   * Put component in disabled mode
   */
  disable?: boolean | undefined;
  /**
   * Put component in readonly mode
   */
  readonly?: boolean | undefined;
  /**
   * Comma separated list of unique file type specifiers. Maps to 'accept' attribute of native input type=file element
   */
  accept?: string | undefined;
  /** Support for uploading images */
  images?: boolean | undefined;
  /** Support for uploading videos  */
  video?: boolean | undefined;
  /** Support for uploading pdf  */
  pdf?: boolean | undefined;
  /** Support for uploading excel  */
  excel?: boolean | undefined;
  /** Uploader style */
  style?: string;
  /**
   * Upload files immediately when added
   */
  autoUpload?: boolean | undefined;
  /** Maximum size of individual file in megabytes */
  maxFileSize?: number | string | undefined;
  /** Maximum size of all files combined in megabytes */
  maxTotalSize?: number | string | undefined;
  /** Maximum number of files to contain */
  maxFiles?: number | string | undefined;
  /**
   * Field name for each file upload; This goes into the following header: 'Content-Disposition: form-data; name="__HERE__"; filename="somefile.png"; If using a function then for best performance, reference it from your scope and do not define it inline
   * Default value: (file) => file.name
   * @param files The current file being processed
   * @returns Field name for the current file upload
   */
  fieldName?: string | ((files: File) => string) | undefined;
  /**
   * Object with additional fields definitions (used by Form to be uploaded);
   */
  formFields?: Record<string, any> | undefined;
  /**
   * Label for the uploader
   */
  label?: string | undefined;
  /** The url to which the files will be uploaded to */
  url: string | ((files: readonly File[]) => string);
  /** Object of data */
  modelValue: Record<string, any | any[]>;
  /** Input errors */
  errors?: string[] | undefined;
  /** The name of the field containing the attachments */
  attachments: string;
  /** Hide delete media items from uploader, no delete media For API */
  hideDeleteMedia?: boolean | undefined;
  /**
   * Method to delete media
   */
  deleteMedia?: (() => Promise<AxiosResponse>) | undefined;
}

export interface MUploaderSlots extends QUploaderSlots {
  /**
   * Field main content
   */
  default: () => VNode[];
}

export type MUploaderMediaItem = {
  id: number;
  name: string;
  file_name: string;
  type: string;
  size: number;
  size_to_string: string;
  url: string;
  download_url: string;
  icon: string;
  description: string;
  user_id: number | null;
}
export type MUploaderXhrInfo = { files: readonly any[]; xhr: any; }

export {}
