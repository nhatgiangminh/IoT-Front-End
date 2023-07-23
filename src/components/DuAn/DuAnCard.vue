<template>
  <div class="project-card-container" @click="handleClick">
    <div class="top">
      <img :src="project.thumbnailPath" alt="thumbnail" />
    </div>
    <div class="bottom">
      <div class="project-name-container">
        <h1>{{ project.name }}</h1>
      </div>
      <div class="detail-box">
        <div class="info-box">
          <div class="label">
            <span>Căn hộ</span>
          </div>
          <span class="content">{{ project.numberApartment }}</span>
        </div>
        <div class="info-box">
          <div class="label">
            <span>Block</span>
          </div>
          <span class="content">{{ project.block.length }}</span>
        </div>
        <div class="info-box">
          <div class="label">
            <span>Loại phòng</span>
          </div>
          <span class="content">{{ project.typeApartment.length }}</span>
        </div>
      </div>
      <div class="footer">
        <span>Xem chi tiết</span>
        <ArrowRightOutlined />
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowRightOutlined } from '@ant-design/icons-vue'

defineComponent({ ArrowRightOutlined })
const props = defineProps({ project: Object })
const router = useRouter()
const handleClick = () => {
  sessionStorage.setItem('subMenuItem', 'thong-tin-toa-nha')
  router.push(`/thong-tin/${props.project._id}`)
}
</script>
<style lang="scss" scoped>
.project-card-container {
  border-radius: 16px 16px 4px 4px;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: $main-light;
  box-shadow: 2px 3px 4px 0.5px #0000001A;
  margin-bottom: 16px;

  &:hover {
    cursor: pointer;
  }

  .top {
    img {
      width: 100%;
      min-height: 110px;
      max-height: 110px;
      object-fit: cover;
      border-radius: 8px 8px 0px 0px;
    }
  }

  .bottom {
    display: flex;
    flex-direction: column;
    width: 100%;

    .project-name-container {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      h1 {
        font-weight: 700;
        font-size: 24px;
        text-transform: uppercase;
      }
    }

    .detail-box {
      display: flex;
      gap: 16px;
      padding: 16px;
      flex-wrap: wrap;

      .info-box {
        flex: 1;
        display: flex;
        flex-direction: column;
        border: 1px solid $secondary-gray;
        border-radius: 8px;
        gap: 8px;
        padding: 2px;
        text-align: center;

        .label {
          background-color: $primary-lightgrey;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
        }

        .content {
          font-size: 20px;
          font-weight: 800;
        }
      }
    }

    .footer {
      width: 100%;
      background-color: $primary-lightgrey;
      text-align: center;
      padding: 4px 8px;
      display: flex;
      gap: 10px;
      align-items: center;
      justify-content: center;
      border-radius: 0 0 4px 4px;
    }
  }
}</style>
