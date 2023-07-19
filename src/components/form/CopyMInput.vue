<!--
  - MyTh Ahmed Faiz Copyright © 2022 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - https://www.4myth.com
  -->

<script lang="ts">
import { QInput } from 'quasar'
import { computed, defineEmits, onMounted, PropType, ref } from 'vue'
import useInputProps from '../../composition/useInputProps'
import { getMyThPluginOptions } from '../../utils/Const'
import { Field as VeeField } from 'vee-validate'

// interface Props extends MInputProps {
//   auto?: boolean | undefined;
//   col?: ColStyleType;
//   xs?: ColStyleType;
//   sm?: ColStyleType;
//   md?: ColStyleType;
//   lg?: ColStyleType;
//   xl?: ColStyleType;
//   outlined?: boolean | undefined;
//   standout?: boolean | string | undefined;
//   borderless?: boolean | undefined;
//   stackLabel?: boolean | undefined;
//   filled?: boolean | undefined;
//   dense?: boolean | undefined;
//   hideBottomSpace?: boolean | undefined;
//   name?: string | undefined;
//   label?: string | undefined;
//   placeholder?: string | undefined;
//   hidePlaceholder?: boolean | undefined;
//   required?: boolean | undefined;
//   hideRequired?: boolean | undefined;
//   email?: boolean | undefined;
//   clearable?: boolean | undefined;
//   loading?: boolean | undefined;
//   rules?: string | string[] | undefined;
//   errors?: Record<string, string[]>;
//   modelValue: any;
// }

type ColString = 'auto' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12'
type ColNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

// type EmitsTypes = {
//   (e: 'update:modelValue', value: any): void
// }
console.log(QInput.props)
export default {
  inheritAttrs: !1,
  props: {
    ...QInput.props,
    auto: {
      type: Boolean,
      default: () => undefined
    },
    col: {
      type: [String as PropType<ColString>, Number as PropType<ColNumber>],
      default: () => undefined
    },
    xs: {
      type: [String as PropType<ColString>, Number as PropType<ColNumber>],
      default: () => undefined
    },
    sm: {
      type: [String as PropType<ColString>, Number as PropType<ColNumber>],
      default: () => undefined
    },
    md: {
      type: [String as PropType<ColString>, Number as PropType<ColNumber>],
      default: () => undefined
    },
    lg: {
      type: [String as PropType<ColString>, Number as PropType<ColNumber>],
      default: () => undefined
    },
    xl: {
      type: [String as PropType<ColString>, Number as PropType<ColNumber>],
      default: () => undefined
    },
    name: {
      type: String,
      default: () => undefined
    },
    label: {
      type: String,
      default: () => undefined
    },
    placeholder: {
      type: String,
      default: () => undefined
    },
    hidePlaceholder: {
      type: Boolean,
      default: () => undefined
    },
    required: {
      type: Boolean,
      default: () => undefined
    },
    hideRequired: {
      type: Boolean,
      default: () => undefined
    },
    email: {
      type: Boolean,
      default: () => undefined
    },
    errors: {
      type: Object,
      default: () => ({})
    },
    rules: {
      type: [Object, Array as PropType<string[]>, String],
      default: () => undefined
    }
    // rules: undefined,
  },
  emits: ['update:modelValue'],
  components: {
    VeeField
  },
  setup (props, { emit }) {
    // const props = withDefaults(defineProps<Props>(), {
    //   auto: undefined,
    //   col: undefined,
    //   xs: undefined,
    //   sm: undefined,
    //   md: undefined,
    //   lg: undefined,
    //   xl: undefined,
    //   name: undefined,
    //   label: undefined,
    //   placeholder: undefined,
    //   hidePlaceholder: undefined,
    //   outlined: undefined,
    //   filled: undefined,
    //   standout: undefined,
    //   borderless: undefined,
    //   rules: undefined,
    //   required: undefined,
    //   hideRequired: undefined,
    //   email: undefined,
    //   stackLabel: undefined,
    //   clearable: undefined,
    //   dense: undefined,
    //   loading: undefined,
    //   hideBottomSpace: !0,
    //   errors: () => ({}),
    //   modelValue: undefined
    // })
    /* Emit instead of use ref */
    const inputValue = computed({
      get: () => props.modelValue,
      set: value => emit('update:modelValue', value)
    })
    // const inputValue = ref(props.modelValue)

    const {
      getRules,
      getLabel,
      getPlaceholder
    } = useInputProps(props)

    const ready = ref(!1)
    const def = getMyThPluginOptions().options?.input || {}
    onMounted(() => {
      ready.value = !0
    })
    return {
      inputValue,
      getRules,
      getLabel,
      getPlaceholder,
      def
    }
  }
}
</script>

<template>
  <MCol
    :auto="auto"
    :col="col"
    :lg="lg"
    :md="md"
    :sm="sm"
    :xs="xs"
    :class="$attrs.class"
  >
    <VeeField
      v-slot="fieldScope"
      v-model="inputValue"
      :name="name"
      :rules="getRules"
      v-bind="$attrs"
    >
      <q-input
        :error="fieldScope.errors.length>0"
        :error-message="fieldScope.errorMessage"
        :label="getLabel"
        :model-value="inputValue"
        :placeholder="getPlaceholder"
        v-bind="{...def,...$attrs,...fieldScope.field}"
      >
        <template
          v-for="(_,slot) in $slots"
          :key="slot"
          #[slot]="inputSlot"
        >
          <slot
            v-if="inputSlot"
            :name="slot"
            v-bind="inputSlot"
          />
          <slot
            v-else-if="slot !== 'default'"
            :name="slot"
          />
        </template>
      </q-input>
      <slot
        v-bind="fieldScope"
      />
    </VeeField>
  </MCol>
</template>
