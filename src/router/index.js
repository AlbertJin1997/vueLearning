import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ComponentView from '../views/ComponentView.vue'
import CompositionApiView from '../views/CompositionApiView.vue'
import ReactiveView from '../views/ReactiveView.vue'
import PiniaView from '../views/PiniaView.vue'
import LifecycleView from '../views/LifecycleView.vue'
import DirectiveView from '../views/DirectiveView.vue'
import DynamicComponentView from '../views/DynamicComponentView.vue'
import PlyrView from '../views/PlyrView.vue'
import XgplayerView from '../views/XgplayerView.vue'
import ExternalControlDemo from '../components/ExternalControlDemo.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/components', name: 'components', component: ComponentView },
  { path: '/composition-api', name: 'composition-api', component: CompositionApiView },
  { path: '/reactive', name: 'reactive', component: ReactiveView },
  { path: '/pinia', name: 'pinia', component: PiniaView },
  { path: '/lifecycle', name: 'lifecycle', component: LifecycleView },
  { path: '/directive', name: 'directive', component: DirectiveView },
  { path: '/dynamic-component', name: 'dynamic-component', component: DynamicComponentView },
  { path: '/plyr', name: 'plyr', component: PlyrView },
  { path: '/xgplayer', name: 'xgplayer', component: XgplayerView },
  { path: '/external-control', name: 'external-control', component: ExternalControlDemo }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router