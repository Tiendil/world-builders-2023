import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import Wind from '@/presets';

// import 'primevue/resources/themes/aura-light-green/theme.css'

import App from './App.vue'
import router from './router'

// primevue components

import PrimeCard from 'primevue/card';
import PrimeAvatar from 'primevue/avatar';
import PrimeTag from 'primevue/tag';
import PrimeFieldset from 'primevue/fieldset';
import PrimePanel from 'primevue/panel';
import PrimeTabView from 'primevue/tabview';
import PrimeTabPanel from 'primevue/tabpanel';
import PrimeButton from 'primevue/button';
import PrimeMessage from 'primevue/message';
import PrimeInlineMessage from 'primevue/inlinemessage';
import PrimeChip from 'primevue/chip';
import PrimeDivider from 'primevue/divider';
import PrimeDropdown from 'primevue/dropdown';
import PrimeKnob from 'primevue/knob';

import PrimeTooltip from 'primevue/tooltip';

// game components

import GameTime from './components/GameTime.vue'

import GamePersons from './components/GamePersons.vue'
import GamePerson from './components/GamePerson.vue'
import GamePersonChip from './components/GamePersonChip.vue'
import GamePersonChoose from './components/GamePersonChoose.vue'

import GameOrganizations from './components/GameOrganizations.vue'
import GameOrganization from './components/GameOrganization.vue'

import GameEvents from './components/GameEvents.vue'
import GameEvent from './components/GameEvent.vue'

import GameInvestigations from './components/GameInvestigations.vue'
import GameInvestigation from './components/GameInvestigation.vue'
import GameInvestigationChallenges from './components/GameInvestigationChallenges.vue'
import GameInvestigationChallenge from './components/GameInvestigationChallenge.vue'

import GameMaterials from './components/GameMaterials.vue'
import GameMaterialInfo from './components/GameMaterialInfo.vue'
import GameMaterialChoose from './components/GameMaterialChoose.vue'
import GameMaterialThemeConnotationSelect from './components/GameMaterialThemeConnotationSelect.vue'

import GameTwitter from './components/GameTwitter.vue'
import GameNewspaper from './components/GameNewspaper.vue'

import GamePersonTopics from './components/GamePersonTopics.vue'
import GameTopicsSummary from './components/GameTopicsSummary.vue'
import GameTopicThemes from './components/GameTopicThemes.vue'

import GameControlPanel from './components/GameControlPanel.vue'

import GameTextFlag from './components/ui/GameTextFlag.vue'
import GameEntityName from './components/ui/GameEntityName.vue'
import GamePercents from './components/ui/GamePercents.vue'

import GameInfoPanel from './components/info-panel/Panel.vue'
import GameInfoPanelNone from './components/info-panel/None.vue'
import GameInfoPanelPerson from './components/info-panel/Person.vue'
import GameInfoPanelOrganization from './components/info-panel/Organization.vue'
import GameInfoPanelEvent from './components/info-panel/Event.vue'
import GameInfoPanelInvestigation from './components/info-panel/Investigation.vue'
import GameInfoPanelRawChallengesList from './components/info-panel/RawChallengesList.vue'
import GameInfoPanelArc from './components/info-panel/Arc.vue'

const app = createApp(App)

// primevue components

app.component('PrimeCard', PrimeCard)
app.component('PrimeAvatar', PrimeAvatar)
app.component('PrimeTag', PrimeTag)
app.component('PrimeFieldset', PrimeFieldset)
app.component('PrimePanel', PrimePanel)
app.component('PrimeTabView', PrimeTabView)
app.component('PrimeTabPanel', PrimeTabPanel)
app.component('PrimeButton', PrimeButton)
app.component('PrimeMessage', PrimeMessage)
app.component('PrimeInlineMessage', PrimeInlineMessage)
app.component('PrimeChip', PrimeChip)
app.component('PrimeDivider', PrimeDivider)
app.component('PrimeDropdown', PrimeDropdown)
app.component('PrimeKnob', PrimeKnob)

// game components

app.component('GameTime', GameTime)

app.component('GamePersons', GamePersons)
app.component('GamePerson', GamePerson)
app.component('GamePersonChip', GamePersonChip)
app.component('GamePersonChoose', GamePersonChoose)

app.component('GameOrganizations', GameOrganizations)
app.component('GameOrganization', GameOrganization)

app.component('GameEvents', GameEvents)
app.component('GameEvent', GameEvent)

app.component('GameInvestigations', GameInvestigations)
app.component('GameInvestigation', GameInvestigation)
app.component('GameInvestigationChallenges', GameInvestigationChallenges)
app.component('GameInvestigationChallenge', GameInvestigationChallenge)

app.component('GameMaterials', GameMaterials)
app.component('GameMaterialInfo', GameMaterialInfo)
app.component('GameMaterialChoose', GameMaterialChoose)
app.component('GameMaterialThemeConnotationSelect', GameMaterialThemeConnotationSelect)

app.component('GameTwitter', GameTwitter)
app.component('GameNewspaper', GameNewspaper)

app.component('GamePersonTopics', GamePersonTopics)
app.component('GameTopicsSummary', GameTopicsSummary)
app.component('GameTopicThemes', GameTopicThemes)

app.component('GameControlPanel', GameControlPanel)

app.component('GameTextFlag', GameTextFlag)
app.component('GameEntityName', GameEntityName)
app.component('GamePercents', GamePercents)

app.component('GameInfoPanel', GameInfoPanel)
app.component('GameInfoPanelNone', GameInfoPanelNone)
app.component('GameInfoPanelPerson', GameInfoPanelPerson)
app.component('GameInfoPanelOrganization', GameInfoPanelOrganization)
app.component('GameInfoPanelEvent', GameInfoPanelEvent)
app.component('GameInfoPanelInvestigation', GameInfoPanelInvestigation)
app.component('GameInfoPanelRawChallengesList', GameInfoPanelRawChallengesList)
app.component('GameInfoPanelArc', GameInfoPanelArc)


app.directive('primeTooltip', PrimeTooltip);


app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  unstyled: true,
  pt: Wind
})

app.mount('#app')
