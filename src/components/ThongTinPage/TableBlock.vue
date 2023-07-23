<template>
  <a-row class="table-block-duan-wrapper">
    <a-col span="24">
      <a-table :columns="columns" :data-source="dataSource" class="table-block-duan" :pagination="false">
        <template #headerCell="{ column }">
          <template v-if="column.key === 'action'">
            <AddIcon @click="onAdd" class="add-icon"/>
          </template>
        </template>
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.key === 'action'">
            <span v-if="editableData[record._id]">
              <a @click="handleChangeRecord(record._id)"> <check-circle-outlined class="icon"/> </a>
              <a @click="onCancel(record._id)"> <close-circle-outlined class="icon"/> </a>
            </span>
            <span v-else-if="record.isNew">
              <a @click="handleSaveRecord"> <check-circle-outlined class="icon"/> </a>
              <a @click="onCancelCreate"> <close-circle-outlined class="icon"/> </a>
            </span>
            <div v-else class="tooltip-record-table-container">
              <MenuTooltip style="{align: center}">
                <template #logo>
                  <img src="@/assets/Icon/FunctionIcons/IconMenuTooltip.svg" />
                </template>
                <template #content>
                  <div class="tooltip-record-table">
                    <span @click="onEdit(record._id)">Chỉnh sửa</span>
                    <span @click="onDelete(record)">Xoá</span>
                  </div>
                </template>
              </MenuTooltip>
            </div>
          </template>
          <template  v-else-if="['name', 'numberFloor', 'numberApartment'].includes(column.key)">
            <div v-if="record.isNew">
              <a-input v-model:value="inputState[column.key]" @pressEnter="handleSaveRecord" class="input-project-table"/>
            </div>
            <div v-else>
              <a-input 
                v-if="editableData[record._id]"
                class="input-project-table"
                v-model:value="editableData[record._id][column.dataIndex]"
                @pressEnter="handleChangeRecord(record._id)"
              />
              <template v-else>
                {{ text }}
              </template>
            </div>
          </template>
        </template>
      </a-table>
    </a-col>
  </a-row>
</template>
<script>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { computed } from 'vue'
import AddIcon from '@/assets/Icon/QuanTriPageIcons/AddIcon.vue'
import MenuTooltip from '@/components/MenuTooltip/MenuTooltip.vue'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons-vue'

export default {
  components: { AddIcon, MenuTooltip, CheckCircleOutlined, CloseCircleOutlined },
  setup() {
    const store = useStore()
    const dataSource = computed(() => store.getters['project/getCurrentProject'] ? store.getters['project/getCurrentProject'].block : [])
    const columns = ref([
      {
        title: 'Block',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Số tầng',
        key: 'numberFloor',
        dataIndex: 'numberFloor',
        align: 'center'
      },
      {
        title: 'Sô lượng căn hộ',
        key: 'numberApartment',
        dataIndex: 'numberApartment',
        align: 'center'
      },
      {
        // title: '+',
        key: 'action',
        align: 'center'
      }
    ])
    const defaultState = {
      name: '',
      numberFloor: 0,
      numberApartment: 0
    }
    const inputState = reactive({
      ...defaultState
    })
    const editableData = reactive({})

    const onEdit = (id) => {
      editableData[id] = {...dataSource.value.filter((item) => id === item._id)[0]}
    }
    const onAdd = () => {
      if (dataSource.value.length > 0 && Object.hasOwn(dataSource.value[dataSource.value.length -1], 'isNew')) {
        return
      }
      const newItem = {
        name: '',
        numberFloor: 0,
        numberApartment: 0,
        isNew: true
      }
      dataSource.value.push(newItem)
    }

    const handleSaveRecord = async () => {
      await store.dispatch('project/createTableRecord', { inputState, url: 'block' })
      Object.assign(inputState, defaultState)
    }

    const handleChangeRecord = async (id) => {
      const changeData = {...editableData[id], blockId: id}
      delete changeData.createdAt
      delete changeData.createdBy
      delete changeData.updatedAt
      delete changeData.updatedBy
      delete changeData._id
      delete changeData.__v
      await store.dispatch('project/updateTableRecord', { inputState: changeData, url: `block/${id}` })
      delete editableData[id]
    }
    const onCancel = (id) => {
      delete editableData[id]
    }
    const onCancelCreate = () => {
      dataSource.value.pop()
    }
    const onDelete = async (record) => {
      await store.dispatch('project/updateTableRecord', { inputState: { isDeleted: true, name: record.name }, url:  `block/${record._id}` })
      delete editableData[record._id]
    }
    
    return {
      columns,
      dataSource,
      onAdd,
      handleSaveRecord,
      inputState,
      editableData,
      handleChangeRecord,
      onCancel,
      onCancelCreate,
      onDelete,
      onEdit
    }
  }
}
</script>
<style lang="scss">
.table-block-duan-wrapper {
  // margin: 32px 16px;
  height: 100%;
  .icon {
    padding: 5px;
    svg {
      height: 15px;
      width: 15px;
    }
  }
}
.table-block-duan.ant-table-wrapper {
  height: 100%;
  border-radius: 8px;
  .ant-table table {
    font-size: 12px;
  }
  .ant-table-tbody > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td {
    background-color: $main-gray;
  }
  .ant-table-thead > tr > th {
    background: none;
    color: #868181;
  }
  .ant-table-row-cell-break-word {
    font-weight: 400;
    color: #262626;
  }
  .ant-table-thead > tr > th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan])::before {
    display: none;
  }
  .ant-table-tbody > tr > td, th {
    border: none
  }
  .input-project-table {
    border-radius: 5px;
    font-size: 12px;
  }
}
</style>