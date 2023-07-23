<template>
  <ModalLayout :visible="visible" width="70%" @closeModal="handleClose">
    <a-form :labelWrap="true" ref="formRef" :model="formState" layout="vertical">
      <a-row class="create-project-form-wrapper" :gutter="24">
        <a-col span="12">
          <a-form-item label="Tên lớp học" name="name" :rules="rules.name">
            <a-input v-model:value="formState.name"></a-input>
          </a-form-item>
        </a-col>
        <a-col span="12">
          <a-form-item label="Mã lớp học" name="code" :rules="rules.code">
            <a-input  v-model:value="formState.code"></a-input>
          </a-form-item>
        </a-col>
        <a-col span="12">
          <a-form-item label="Ngày" :name="['time', 'day']" :rules="rules.time">
            <a-select v-model:value="formState.time.day">
              <a-select-option value="MON">
                Thứ 2
              </a-select-option>
              <a-select-option value="TUES">
                Thứ 3
              </a-select-option>
              <a-select-option value="WED">
                Thứ 4
              </a-select-option>
              <a-select-option value="THURS">
                Thứ 5
              </a-select-option>
              <a-select-option value="FRI">
                Thứ 6
              </a-select-option>
              <a-select-option value="SAT">
                Thứ 7
              </a-select-option>
              <a-select-option value="SUN">
                Chủ nhật
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col span="12">
          <a-form-item label="Thời gian" :name="['time', 'time']" :rules="rules.time">
            <a-time-range-picker
              v-model:value="formState.time.time"
              :minute-step="15"
              format="HH:mm"
              value-format="HH:mm"
            >
            </a-time-range-picker>
          </a-form-item>
        </a-col>
        <a-col span="12">
          <a-form-item name="amount" label="Số lượng" :rules="rules.amount">
            <a-input v-model:value="formState.amount" />
          </a-form-item>
        </a-col>
        <a-col span="12">
          <a-form-item name="students" label="Chọn giảng viên" :rules="rules.code">
            <a-select v-model:value="formState.students">
              <a-select-option v-for="gv in listTeacher" :key="gv._id" :value="gv._id">
              {{ gv.fullName }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col span="24">
          <a-form-item label="Mô tả" name="description">
            <a-textarea v-model:value="formState.description"></a-textarea>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <template #footer>
      <RedButton @click="onSubmit">
        <template #title>
          Xác nhận
        </template>
      </RedButton>
    </template>
  </ModalLayout>
</template>
<script setup>
import { reactive, ref, defineProps, defineComponent, defineEmits, computed } from 'vue'
import ModalLayout from '@/components/Modal/ModalLayout.vue'
import RedButton from '@/components/Button/RedButton.vue'
import { useStore } from 'vuex'
import { message } from 'ant-design-vue'

defineComponent({ ModalLayout, RedButton })
defineProps({ visible: Boolean })
const store = useStore()
const formRef = ref()
const emit = defineEmits(['submit', 'update:visible'])
await store.dispatch('user/fetchListUser')
const listTeacher = computed(() => store.getters['user/getListUser'].filter((user) => user.role.value === 'TEACHER'))
const formState = reactive({
  name: null,
  code: null,
  time: {
    time: [],
    day: null
  },
  amount: null,
  description: null,
  students: []
})
const rules = reactive({
  code: [{ required: true, message: 'Vui lòng nhập giá trị' }],
  name: [{ required: true, message: 'Tên lớp học bắt buộc' }],
  time: [{ required: true, message: 'Vui lòng nhập giá trị' }],
  amount: [{ pattern: '^[0-9]+$', message: 'Số lượng chỉ được nhập số' }, { required: true, message: 'Vui lòng nhập giá trị!' }]
})

const onSubmit = () => {
  formRef.value.validateFields().then((values) => {
    const inputData = {
      ...values
    }
    console.log(inputData)
    inputData.time = { day: inputData.time.day, from: inputData.time.time[0], to: inputData.time.time[1] }
    return store.dispatch('classR/createClass', inputData)
  })
    .then(() => {
      formRef.value.resetFields()
      emit('update:visible', false)
    })
    .catch((error) => {
      if (error.response?.data.message) {
        message.error(error.response.data.message)
      } else if (error.errorFields.length === 0) {
        message.error('Tạo lớp thất bại, vui lòng thử lại!')
      }
    })
}
const handleClose = () => {
  emit('update:visible', false)
  formRef.value.resetFields()
}
</script>
<style lang="scss">
.create-project-form-wrapper {
  input,textarea {
    border-radius: 8px;
    padding: 8px;
  }
  textarea {
    min-height: 10em;
  }
}
</style>
