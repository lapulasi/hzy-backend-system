<template>
  <div class="app">
    <AppHeader fixed>
      <b-row>
        <b-col cols="3" offset-md="1">
          <img class="navbar-brand-full" src="img/shk-logo.png" width="50" height="50" alt="">
        </b-col>
        <b-col cols="8" style="line-height: 50px; font-size: 18px; font-weight: bold">
          视惠康管理后台
        </b-col>
      </b-row>
      <SidebarToggler class="d-lg-none" display="md" mobile />
      <SidebarToggler class="d-md-down-none" display="lg" />
      <!--<b-navbar-nav class="d-md-down-none">-->
        <!--<b-nav-item class="px-3" to="/dashboard">Dashboard</b-nav-item>-->
        <!--<b-nav-item class="px-3" to="/users" exact>Users</b-nav-item>-->
        <!--<b-nav-item class="px-3">Settings</b-nav-item>-->
      <!--</b-navbar-nav>-->
      <b-navbar-nav class="ml-auto">
        <!--<b-nav-item class="d-md-down-none">
          <i class="icon-bell"></i>
          <b-badge pill variant="danger">5</b-badge>
        </b-nav-item>
        <b-nav-item class="d-md-down-none">
          <i class="icon-list"></i>
        </b-nav-item>
        <b-nav-item class="d-md-down-none">
          <i class="icon-location-pin"></i>
        </b-nav-item>-->
        <DefaultHeaderDropdownAccnt/><!--右上角头像-->
      </b-navbar-nav>
      <!--<AsideToggler class="d-none d-lg-block" />-->
      <!--<AsideToggler class="d-lg-none" mobile />-->
    </AppHeader>
    <div class="app-body">
      <!--左侧边栏-->
      <AppSidebar fixed>
        <SidebarHeader/>
        <SidebarForm/>
        <SidebarNav :navItems="nav"></SidebarNav>
        <SidebarFooter/>
        <SidebarMinimizer/>
      </AppSidebar>
      <main class="main">
        <Breadcrumb :list="list"/><!--内容部分的面包屑导航-->
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
      <!--右上角侧边栏-->
      <!--<AppAside fixed>
        &lt;!&ndash;aside&ndash;&gt;
        <DefaultAside/>
      </AppAside>-->
    </div>
    <!--<TheFooter>
      &lt;!&ndash;footer&ndash;&gt;
      <div>
        <a href="https://coreui.io">CoreUI</a>
        <span class="ml-1">&copy; 2018 creativeLabs.</span>
      </div>
      <div class="ml-auto">
        <span class="mr-1">Powered by</span>
        <a href="https://coreui.io">CoreUI for Vue</a>
      </div>
    </TheFooter>-->
  </div>
</template>

<script>
import nav from '@/_nav'
import { Header as AppHeader, SidebarToggler, Sidebar as AppSidebar, SidebarFooter, SidebarForm, SidebarHeader, SidebarMinimizer, SidebarNav, Aside as AppAside, AsideToggler, Footer as TheFooter, Breadcrumb } from '@coreui/vue'
import DefaultAside from './DefaultAside'
import DefaultHeaderDropdownAccnt from './DefaultHeaderDropdownAccnt'

export default {
  name: 'DefaultContainer',
  components: {
    AsideToggler,
    AppHeader,
    AppSidebar,
    AppAside,
    TheFooter,
    Breadcrumb,
    DefaultAside,
    DefaultHeaderDropdownAccnt,
    SidebarForm,
    SidebarFooter,
    SidebarToggler,
    SidebarHeader,
    SidebarNav,
    SidebarMinimizer
  },
  data () {
    return {
      nav: nav.items
    }
  },
  computed: {
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched.filter((route) => route.name || route.meta.label )
    }
  }
}
</script>
