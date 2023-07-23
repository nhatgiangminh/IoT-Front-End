<template>
  <a-row class="thongtin-page">
    <a-col span="24" style="max-height: 700px">
      <a-row class="top">
        <a-col span="11" style="padding-right: 24px; position: relative; max-height: 600px">
          <img :src="thumbnailUrl ? thumbnailUrl : project.thumbnailPath" alt="thumbnail" class="image-page">
          <a-upload v-model:fileList="fileList" accept="image/*" :show-upload-list="false" :action="env" :headers="header"
            :data="data" @change="handleUpload">
            <img src="@/assets/Icon/ThongTinPage/UploadImage.svg" class="upload-icon" />
          </a-upload>
        </a-col>
        <a-col span="13">
          <ProjectDetail />
        </a-col>
      </a-row>
    </a-col>
    <a-col span="24">
      <a-row type="flex" class="project-overview">
        <a-col flex="1" class="dientich info">
          <DienTichIcon class="info-icon" />
          <div class="info-title">Diện tích (m²)</div>
          <div class="info-number">{{ project.area }}</div>
        </a-col>
        <a-col flex="1" class="info block">
          <block-icon class="info-icon" />
          <div class="info-title">Block</div>
          <div class="info-number">{{ project.numberOfBlock }}</div>
        </a-col>
        <a-col flex="1" class="type info">
          <loai-can-ho class="info-icon" />
          <div class="info-title">Loại căn hộ</div>
          <div class="info-number">{{ project.numberOfTypeApartment }}</div>
        </a-col>
        <a-col flex="1" class="tienich info">
          <tien-ich class="info-icon" />
          <div class="info-title">Tiện ích</div>
          <div class="info-number">{{ project.service }}</div>
        </a-col>
        <a-col flex="1" class="tangham info">
          <tang-ham class="info-icon" />
          <div class="info-title">Tầng hầm</div>
          <div class="info-number">{{ project.basement }}</div>
        </a-col>
      </a-row>
    </a-col>
    <a-col span="24">
      <a-row class="bottom" type="flex">
        <a-col span="14">
          <TableLoaiCanHo />
        </a-col>
        <a-col span="10">
          <TableBlock />
        </a-col>
      </a-row>
    </a-col>
  </a-row>
</template>
<script>
import BlockIcon from '@/assets/Icon/ThongTinPage/BlockIcon.vue'
import LoaiCanHo from '@/assets/Icon/ThongTinPage/LoaiCanHo.vue'
import TangHam from '@/assets/Icon/ThongTinPage/TangHam.vue'
import TienIch from '@/assets/Icon/ThongTinPage/TienIch.vue'
import DienTichIcon from '@/assets/Icon/ThongTinPage/DienTichIcon.vue'
import ProjectDetail from '@/components/ThongTinPage/ProjectDetail.vue'
import TableLoaiCanHo from '@/components/ThongTinPage/TableLoaiCanHo.vue'
import TableBlock from '@/components/ThongTinPage/TableBlock.vue'
import { computed, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { message } from 'ant-design-vue'
import { useProcessEnv } from '@/composables/process-env'

const previewImage = (img, callback) => {
  const fileReader = new FileReader()
  fileReader.addEventListener('load', () => callback(fileReader.result))
  fileReader.readAsDataURL(img)
}
export default {
  components: { BlockIcon, LoaiCanHo, TangHam, TienIch, ProjectDetail, TableLoaiCanHo, DienTichIcon, TableBlock },
  async setup() {
    const store = useStore()
    const route = useRoute()
    // const thumbnail = ref('')
    const thumbnailUrl = ref('')
    const header = reactive({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    })
    // onMounted(async () => {
    await store.dispatch('project/fetchProject', route.params.id)
    // })
    const fileList = ref([])
    const handleUpload = (info) => {
      if (info.file.status === 'uploading') {
        return
      }
      if (info.file.status === 'done') {
        // thumbnail.value = info.file.response.data.file_name
        previewImage(info.file.originFileObj, (result) => {
          thumbnailUrl.value = result
        })
        // store.dispatch('project/updateProject', { thumbnail: thumbnail.value })
        store.dispatch('project/fetchProject', project.value._id)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    }
    const project = computed(() => store.getters['project/getCurrentProject'])
    const env = computed(() => `${process.env.VUE_APP_AXIOS_ADMIN}/v1/file/upload-project/${project.value._id}`)
    const data = computed(() => ({ thumbnail: project.value.thumbnail }))
    return {
      fileList,
      handleUpload,
      useProcessEnv,
      thumbnailUrl,
      project,
      env,
      data,
      header
    }
  }
}
</script>
<style lang="scss">
.thongtin-page {
  background: $light-gray;
  margin-left: 15px;

  .top {
    display: flex;
    min-height: 400px;
    max-height: 700px;
    padding: 16px 24px;

    .image-page {
      height: 100%;
      width: 100%;
      border-radius: 8px;
      object-fit: cover;
    }

    .upload-icon {
      position: absolute;
      bottom: 15px;
      right: 40px;
      z-index: 1;

      &:hover {
        cursor: pointer;
      }
    }
  }

  .bottom {
    max-height: 100%;
    padding: 16px 24px;
  }

  .project-overview {
    justify-content: space-between;
    padding: 0px 8px;

    .info {
      padding: 16px 0px;
      margin: 0px 16px 12px;
      border-radius: 8px;
      background-color: $main-light;

      .info-icon {
        padding-bottom: 8px;
      }

      .info-title {
        font-size: 14px;
        font-weight: 700;
        padding-bottom: 16px;
      }

      .info-number {
        font-size: 24px;
        font-size: 32px;
        font-weight: 800;
      }
    }

    .info.block {
      border: 1px solid $status-waiting;
    }

    .info.type {
      border: 1px solid $flowkit-purple;
    }

    .info.tienich {
      border: 1px solid $status-done;
    }

    .info.tangham {
      border: 1px solid $primary-red;
    }

    .info.dientich {
      border: 1px solid $flowkit-red;
    }
  }

  // .detail-container {
  //   text-align: left;
  //   margin: 32px 16px;
  //   background: #FFF;
  //   border-radius: 8px;
  // }
}
</style>
