/*
 * MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */
import { QFieldSlots, QInputProps, QInputSlots } from 'quasar'
import { ComponentPublicInstance } from 'vue'
import { BaseInputsProps, BaseInputsSlots } from 'src'

export type MyInputProps = Omit<QInputProps, 'rules' | 'name'> & BaseInputsProps

export type MyInputSlots = QInputSlots & QFieldSlots & BaseInputsSlots

export interface MyInput extends ComponentPublicInstance<MyInputProps> {
  $slots: MyInputSlots
}
