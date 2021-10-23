// Link to Project Assets
import {config} from './webbuild/Build/buildconfig.js'
import {Unity} from './Unity.js'

export const settings = {
    name: "P300 Demo",
    devices: ["EEG"],
    author: "Eli Kinney-Lang",
    description: "",
    categories: ["WIP"],
    instructions:"",
    display: {
      production: true,
      development: true
    },

    link: 'https://brainsatplay.com/unity-p300',
    connect: true,
    
    // App Logic
    graph:
    {
      nodes: [
        {id:'eeg', class: brainsatplay.plugins.biosignals.EEG},
        {
          id:'unity', 
          class: Unity, 
          params:{
              config, 
              onUnityEvent: async function event(ev){

                // Parse Messages from Unity
                if (typeof ev === 'string'){
                  console.log('MESSAGE: ' + ev)
                }

              },
              commands: 
              [
                // {
                //     object: 'GameApplication',
                //     function: 'UpdateAlpha',
                //     type: 'number'
                // }
            ]
          }
        },
        {
          id:'ui', 
          class: brainsatplay.plugins.interfaces.UI,
          params: {
            html: `
            <div id="content"></div>
            <div id="instructions">Press s to start</div>
            `,

            style: `#instructions {
              position: absolute;
              bottom: 25px; right: 25px;
            }`
          }
        }
    ],

      edges: [
        {
          source: 'unity:element',
          target: 'ui:content',
        }
      ]
    },
}