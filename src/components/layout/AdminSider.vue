<template>
  <a-layout class="admin-sider">
    <a-layout-sider class="layout-sider" width="250" :collapsed="collapsed" collapsible :trigger="null">
      <!-- <img v-if="collapsed" class="mini-logo" src="@/assets/HouseRoofMiniLogo.svg"/>
      <img v-else class="logo" src="@/assets/HouseRoofLogo.svg"/> -->
      <div v-if="collapsed" class="mini-logo"></div>
      <div v-else class="logo"></div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        :open-keys="openKeys"
        mode="inline"
        @click="moveToPage"
        @open-change="onOpenChange"
      >
        <a-menu-item key="users" v-if="user.role.value === 'ADMIN'">
          <PartnerIcon />
          <span>Người dùng</span>
        </a-menu-item>
        <a-menu-item key="classes">
          <CanHo />
          <span>Lớp học</span>
        </a-menu-item>
        <!-- <a-sub-menu key="manage-category">
          <template #title>
            <DanhMucIcon />
            <span>{{ t('mainMenu.category') }}</span>
          </template>
          <a-menu-item key="category">
            <thong-tin />
            <span>{{ t('mainMenu.categoryManagement') }}</span>
          </a-menu-item>
          <a-menu-item key="category-config">
            <cau-hinh />
            <span>{{ t('mainMenu.config') }}</span>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="product-management">
          <template #title>
            <PartnerIcon />
            <span>{{ t('mainMenu.product') }}</span>
          </template>
          <a-menu-item key="product">
            <thong-tin />
            <span>{{ t('mainMenu.productManagement') }}</span>
          </a-menu-item>
          <a-menu-item key="product-config">
            <cau-hinh />
            <span>{{ t('mainMenu.config') }}</span>
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item key="history">
          <cau-hinh />
          <span>{{ t('mainMenu.history') }}</span>
        </a-menu-item> -->
      </a-menu>
      <!-- <a-menu
        v-model:selectedKeys="selectedKeys"
        :open-keys="openKeys"
        mode="inline"
        @click="moveToPage"
        v-else-if="user.role.value === 'PARTNER'"
        @open-change="onOpenChange"
      >
        <a-sub-menu key="product-management">
          <template #title>
            <PartnerIcon />
            <span>{{ t('mainMenu.product') }}</span>
          </template>
          <a-menu-item key="product">
            <thong-tin />
            <span>{{ t('mainMenu.productManagement') }}</span>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="manage-category">
          <template #title>
            <DanhMucIcon />
            <span>{{ t('mainMenu.category') }}</span>
          </template>
          <a-menu-item key="category-config-partner">
            <cau-hinh />
            <span>{{ t('mainMenu.config') }}</span>
          </a-menu-item>
        </a-sub-menu>
      </a-menu> -->
      <a-row class="collapse-btn" @click="toggleCollapsed">
        <img v-if="!collapsed" class="collapse-icon" src="@/assets/Icon/FunctionIcons/ArrowLeftIcon.svg" alt="">
        <img v-else class="collapse-icon" src="@/assets/Icon/FunctionIcons/ArrowRight.svg" alt="">
      </a-row>
    </a-layout-sider>
  </a-layout>
</template>
<script>
import { defineComponent, ref, reactive, toRefs, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import PartnerIcon from '@/assets/Icon/MenuIcons/ToaNha/CuDan.vue'
import CanHo from '@/assets/Icon/MenuIcons/ToaNha/CanHo.vue'

export default defineComponent({
  setup() {
    const router = useRouter()
    const store = useStore()
    const user = ref(store.getters['auth/getUserData'])
    const state = reactive({
      rootSubmenuKeys: ['manage-user', 'manage-category', 'product-management'],
      openKeys: [sessionStorage.getItem('subMenuItem')],
      selectedKeys: [sessionStorage.getItem('menuItem')]
    })
    const collapsed = computed(() => store.state.collapsed)
    const toggleCollapsed = () => {
      store.commit('setCollapse')
    }
    const itemKey = ref('')
    const moveToPage = ({ key }) => {
      if (key === 'quan-tri') {
        router.push(`/${key}`)
        state.openKeys = []
      } else if (key === 'thong-tin') {
        router.push({ name: 'ThongTin', params: { id: store.getters['project/getCurrentProject']._id } })
      } else {
        router.push(`/${key}`)
      }
      sessionStorage.setItem('subMenuItem', state.openKeys)
      sessionStorage.setItem('menuItem', key)
    }
    const backToHome = () => {
      router.push('/home')
      sessionStorage.clear()
    }
    const onOpenChange = openKeys => {
      const latestOpenKey = openKeys.find(key => state.openKeys.indexOf(key) === -1)
      if (state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        state.openKeys = openKeys
      } else {
        state.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    }
    return {
      itemKey,
      moveToPage,
      router,
      collapsed,
      backToHome,
      toggleCollapsed,
      ...toRefs(state),
      onOpenChange,
      user
    }
  },
  components:
  {
    PartnerIcon,
    CanHo
  }
})
</script>
<style lang='scss'>
.ant-layout.admin-sider {
  svg {
    color: $status-deactivated;
  }

  background: $main-light;
  flex: none;

  // width: 100%;
  .admin-sider {
    overflow: auto;
    // height: 100vh;
    left: 0;
    top: 0;
    bottom: 0
  }

  .logo-item {
    padding-right: 8px;
  }

  .logo {
    height: 70px;
    padding: 5% 10%;
  }

  .mini-logo {
    width: 100%;
    height: 60px;
    padding: 10%;
  }

  .collapse-btn {
    position: absolute;
    bottom: 0;
    cursor: pointer;
    background: $light-gray;
    margin: 10px;
    padding: 10px 8px;
    border-radius: 8px;
    width: calc(100% - 20px);
    justify-content: center;

    .collapse-icon {
      width: 10px;
    }
  }

  .ant-menu-vertical {
    border: none;
  }

  // background color for admin sider.
  .ant-layout-sider {
    background: #fff;
  }

  // CSS for menu item

  // Change color of select item in menu
  .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
    background: $primary-lightred;
    border-radius: 8px;
    color: #434343;
    font-weight: bold;
  }

  .ant-menu-item.ant-menu-item-selected {
    svg {
      color: $primary-red
    }
  }

  .ant-menu-inline .ant-menu-item:last-child {
    margin-top: 12px;
  }

  .ant-menu-inline .ant-menu-item {
    margin: 4px 10px;
    padding-right: 0;
    padding-left: 32px;
    width: calc(100% - 10px);
  }

  // Remove border-right of menu sider
  .ant-menu-inline {
    border-right: none;
    width: calc(100% - 10px);
    // :first-child {
    //   padding-top: 15px;
    // }
  }

  // Remove border-color of selected menu item
  .ant-menu-inline .ant-menu-item::after {
    border-right: none;
  }

  .ant-menu-item.ant-menu-item-selected.ant-menu-item-only-child {
    background: $primary-lightred;
  }

  // .ant-menu-item.ant-menu-item-active {
  //   background: #FAFAFA;
  //   color: #434343;

  // }
  .ant-menu-light.ant-menu-item:hover,
  .ant-menu-item.ant-menu-item-active {
    color: #434343;
    background: $primary-lightred;
    border-radius: 8px;
    font-weight: bold;
  }

  .ant-menu-submenu-selected>.ant-menu-submenu-title {
    color: #434343;

    svg {
      color: $primary-red
    }
  }

  // CSS for sub menu

  .ant-menu-inline .ant-menu-submenu-title {
    margin: 8px 10px;
    width: calc(100% - 10px);
  }

  // CSS for item in sub menu
  .ant-menu-item.ant-menu-item-active.ant-menu-item-only-child {
    background: none;
    color: #434343
  }

  // Remove background color of sub menu title when selected
  .ant-menu-submenu-title:active {
    background: none;
  }

  .ant-menu-submenu-title:hover {
    color: #434343
  }

  li.ant-menu-submenu-active {
    background: none;
    color: #434343;
  }

  // custom size of sub menu form
  .ant-menu-sub.ant-menu-inline {
    // Turn off background color of submenu item
    background: none;
    border-radius: 8px;
    margin: 0 10px;
    overflow: hidden;
  }

  .ant-menu-submenu:hover>.ant-menu-submenu-title>.ant-menu-submenu-arrow {
    color: currentColor
  }

  // custom text color of sub menu
  .ant-menu-submenu.ant-menu-submenu-inline.ant-menu-submenu-open {
    background: none;
    width: calc(100% - 10px);
    box-sizing: border-box;

    // margin-left: 10px;
    .ant-menu-submenu-title {
      margin: 8px 10px;
      width: 100%;
      font-weight: bold;
      background: $primary-lightred;
      border-radius: 8px;

      svg {
        color: $primary-red
      }
    }

    // .ant-menu-sub.ant-menu-inline {
    //   margin: 0;
    // }

  }

  .ant-menu-sub.ant-menu-inline>.ant-menu-item {
    padding-left: 32px !important;
    background: none;
  }

  .ant-menu-item .anticon+span {
    margin-left: 8px;
  }

  .ant-menu-title-content.menu-field {
    font-weight: bold;
  }

  // Collapsed menu
  .ant-menu.ant-menu-inline-collapsed>.ant-menu-item.menu-field {
    padding: 0;
    text-align: center;
  }

  .ant-menu-vertical .ant-menu-item:not(:last-child) {
    margin: 0;
  }

  .ant-menu-sub.ant-menu-vertical>.ant-menu-item.ant-menu-item-selected {
    background: $primary-lightred;
    color: #434343;
  }

  .ant-layout-sider-collapsed.layout-sider {
    .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-active {
      background: $primary-lightred;
      color: #434343;
    }

    .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
      background: $primary-lightred;
      color: #434343;
    }

    .ant-menu-vertical .ant-menu-item {
      margin: 5px 0;
    }
  }
}

.ant-menu-inline-collapsed-tooltip.ant-tooltip-placement-right {
  .anticon {
    padding-right: 5px !important;
  }

  .ant-tooltip-inner {
    padding: 6px 8px !important;
  }
}

.ant-layout-sider-children {
  border-right: 1px solid $secondary-gray;
}

.ant-menu-submenu-popup {
  .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
    background: $primary-lightred;
  }

  .ant-menu-item-selected {
    color: #434343;
  }
}

// .ant-menu-item.ant-menu-item-disabled.menu-group {
//   font-size: 14px
// }</style>
