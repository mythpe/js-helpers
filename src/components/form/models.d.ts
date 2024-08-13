/*
 * MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
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
  QDateProps,
  QEditorProps,
  QEditorSlots,
  QFieldSlots,
  QFileProps,
  QImgProps,
  QInputProps,
  QInputSlots,
  QOptionGroupProps,
  QOptionGroupSlots,
  QRadioProps,
  QSelectProps,
  QTimeProps,
  QToggleProps,
  QUploaderProps,
  QUploaderSlots
} from 'quasar'
import { FormActions, FormContext, FormMeta, FormOptions, Path, SubmissionHandler } from 'vee-validate'
import { ComputedGetter, MaybeRefOrGetter, Ref, UnwrapRef, VNode } from 'vue'
import { MColProps, ViewModeProps } from '../grid/models'
import { EditorConfig } from 'ckeditor5'

export type InputRulesContext = string | string[] | Record<string, any> | undefined;
export type InputErrorsContext = string[];
export type InputFormErrorsContext = Record<string, InputErrorsContext> | undefined;

export type InputHelpProps = {
  /**
   * Information text with Icon.
   */
  help?: string;
}
export type InputHelpSlots = {
  /**
   * VNode bottom of input & before 'bottom-input slot'.
   */
  help: () => VNode[];
}

export type BaseInputFormProps = {
  /**
   * Input name.
   */
  name: string;
  /**
   * Input model value.
   */
  modelValue?: any;
  /**
   * Input Label.
   */
  label?: string | undefined;
  /**
   * Caption under label.
   */
  caption?: string | undefined;
  /**
   * Input Hint.
   */
  hint?: string | undefined;
  /**
   * Input Placeholder.
   */
  placeholder?: string | undefined;
  /**
   * Input Required validation.
   */
  required?: boolean;
  /**
   * Input Validation Rules.
   */
  rules?: InputRulesContext;
  /**
   * Input Error Messages.
   */
  errors?: InputErrorsContext;
  /**
   * Form Error Messages.
   */
  // formErrors?: InputFormErrorsContext;
  /**
   * Input autocomplete attribute.
   * if true, will set from input name.
   * if false, will set 'off'.
   * else, will set the attribute value.
   * Default: undefined.
   */
  autocomplete?: boolean | string | undefined;
  /**
   * Inputs Top Label.
   */
  topLabel?: boolean;
  /**
   * Mobile Rule.
   */
  mobile?: boolean | string | number | undefined;
  /**
   * Email Rule.
   */
  email?: boolean;
  /**
   * Number Rule.
   */
  float?: boolean;
}
export type BaseInputsProps = ViewModeProps & InputHelpProps & Omit<MColProps, 'name'> & BaseInputFormProps;

export type BaseInputsSlots = InputHelpSlots & {
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
   * Field main content
   */
  default: () => VNode[];
  /**
   * VNode bottom of input.
   */
  'bottom-input': () => VNode[];
}

export declare type GenericFormValues = Record<any, any>;

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

export type MInputProps = Omit<QInputProps, 'rules' | 'name' | 'modelValue' | 'label' | 'hint'> & BaseInputsProps
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

export type MHiddenInputSlots = object
export type MHiddenInputProps = {
  /**
   * Input name.
   */
  name: string;
  /**
   * Input model value.
   */
  modelValue: any;
}

export type MOptionsOptionContext = Omit<QToggleProps, 'modelValue'> & Omit<QRadioProps, 'modelValue'> & Omit<QCheckboxProps, 'modelValue'> & {
  /**
   * Label to display along the component
   */
  label: string;
  /**
   * Value of the option that will be used by the component model
   */
  value: any;
  /**
   * If true, the option will be disabled
   */
  disable?: boolean;
  /**
   * Any other props from QToggle, QCheckbox, or QRadio
   */
}
export type MOptionsProps = Omit<QOptionGroupProps, 'name' | 'modelValue' | 'options'> & Omit<BaseInputsProps, 'autocomplete', 'modelValue'> & {
  modelValue?: any;
  /**
   * Array of objects with value, label, and disable (optional) props. The binary components will be created according to this array; Props from QToggle, QCheckbox or QRadio can also be added as key/value pairs to control the components singularly
   */
  options?: MOptionsOptionContext[];
  /**
   * Get options by function. any send the current value to this function to get options.
   */
  service?: ((value: any) => Promise<void>) | undefined;
  /**
   * Service loading.
   */
  loading?: boolean | undefined;
}
export type MOptionsSlots = QOptionGroupSlots & QFieldSlots & BaseInputsSlots

export type MFileProps = Omit<QFileProps, 'rules' | 'name' | 'label' | 'hint'> & Omit<BaseInputsProps, 'modelValue' | 'autocomplete'> & {
  accept?: string | undefined;
  images?: boolean | undefined;
  video?: boolean | undefined;
  pdf?: boolean | undefined;
  excel?: boolean | undefined;
}

export type MFileSlots = BaseInputsSlots

export type MPickerProps =
  Omit<MInputProps, 'modelValue' | 'type' | 'topLabel'>
  & Omit<QDateProps, 'modelValue' | 'options'>
  & Omit<QTimeProps, 'modelValue'>
  & {
  modelValue?: any;
  type?: 'date' | 'time';
  btnProps?: MBtnProps;
  range?: boolean;
}

export type MPickerSlots = MInputSlots

export type MDateProps = Omit<MPickerProps, 'type'>
export type MDateSlots = MPickerSlots

export type MTimeProps = Omit<MPickerProps, 'type'>
export type MTimeSlots = MPickerSlots

export type MSelectProps = Omit<QSelectProps, 'rules' | 'name' | 'modelValue' | 'label' | 'hint'> & BaseInputsProps & {
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

export type MCheckboxProps = Omit<QCheckboxProps, 'name' | 'modelValue' | 'label'> & Omit<BaseInputsProps, 'topLabel'> & {
  /**
   * Top of input label.
   */
  topLabel?: string | null | undefined;
}
export type MCheckboxSlots = BaseInputsSlots & {
  /**
   * VNode before field main content.
   */
  before: () => VNode[];
  /**
   * VNode after field main content.
   */
  after: () => VNode[];
}

export type MToggleProps =
  Omit<BaseInputsProps, 'placeholder' | 'topLabel' | 'autocomplete'>
  & Omit<QToggleProps, 'modelValue' | 'label' | 'name'>
  & {
  /**
   * Customize the label when the toggle is true.
   * Default is: Yes.
   */
  activeLabel?: string;
  /**
   * Customize the label when the toggle is false.
   * Default is: No.
   */
  inactiveLabel?: string;
  /**
   * Set labels of toggle to status, Active & Inactive.
   */
  status?: boolean;
}
export type MToggleSlots = MCheckboxSlots

export type MRadioProps = Omit<QRadioProps, 'name' | 'modelValue' | 'label'> & MCheckboxProps
export type MRadioSlots = MCheckboxSlots

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

export interface MFormProps {
  formProps?: Record<string, any>;
  opts?: FormOptions;
}
export type MFormScope = FormContext;
export interface MFormSlots {
  default: (scope: MFormScope) => VNode[];
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
   * List of error messages.
   */
  errors?: InputErrorsContext;
  /**
   * List of form errors.
   */
  formErrors?: InputFormErrorsContext;
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

export type MEditorProps = Omit<QEditorProps, 'modelValue' | 'placeholder'> & BaseInputsProps
export type MEditorSlots = QEditorSlots & BaseInputsSlots

export type MCkeditorProps = Omit<BaseInputsProps, 'hint' | 'topLabel' | 'placeholder' | 'autocomplete'> & {
  /**
   * Editor language.
   * Default value: ar.
   */
  lang: 'ar' | 'en';
  /**
   * Specifies the configuration of the editor.
   * https://ckeditor.com/docs/ckeditor5/latest/api/module_core_editor_editorconfig-EditorConfig.html
   */
  config?: ((config: UnwrapRef<EditorConfig>) => EditorConfig) | undefined;
  /**
   * By default, the editor component creates a <div> container which is used as an element passed to the editor (for example, ClassicEditor#element).
   * The element can be configured, so for example to create a <textarea>, use the following directive:
   * tag-name="textarea"
   * Default value: div.
   */
  tagName?: string;
  /**
   * This directive controls the isReadOnly property of the editor.
   * Default value: false.
   */
  disabled?: boolean;
  /**
   * Allows disabling the two-way data binding mechanism.
   * Default value: false.
   */
  disableTwoWayDataBinding?: boolean;
}
export type MCkeditorSlots = BaseInputsSlots

export interface MOtpProps extends Omit<QInputProps, 'modelValue'> {
  modelValue?: string | number;
  inputLength?: string | number;
  numeric?: boolean;
  time?: string | number;
  hideTime?: boolean;
  hideSendAgain?: boolean;
  topLabel?: string | undefined;
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
