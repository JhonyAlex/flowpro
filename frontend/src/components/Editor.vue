<template>
  <div id="rete" style="width: 100%; height: 600px; background: #f0f0f0;"></div>
  <button @click="sendToCreation">Enviar a creación</button>
</template>

<script>
import { NodeEditor } from 'rete';
import ConnectionPlugin from 'rete-connection-plugin';
import VueRenderPlugin from 'rete-vue-render-plugin';
import SelectControl from '@/components/controls/SelectControl.vue';
import TextareaControl from '@/controls/TextareaControl.vue';

export default {
  data: () => ({ editor: null }),
  async mounted() {
    const container = this.$el.firstElementChild;
    this.editor = new NodeEditor('demo@0.1.0', container);
    this.editor.use(ConnectionPlugin);
    this.editor.use(VueRenderPlugin);

    const config = await fetch('/api/nodos/chatbot').then(r => r.json());
    const node = await this.createNodeFromConfig(config, [80, 200]);
    await this.editor.addNode(node);
    this.editor.view.resize();
    this.editor.trigger('process');
  },
  methods: {
    async createNodeFromConfig(config, position = [0, 0]) {
      const node = await this.editor.createNode(config.tipo);
      node.position = position;

      for (const campo of config.campos) {
        const control = await this.generateControl(node, campo, config);
        if (control) node.addControl(control);
      }

      return node;
    },

    async generateControl(node, campo, parentConfig = null) {
  const key = campo.nombre;
  const vueComp = campo.tipo === 'select' ? SelectControl
                : campo.tipo === 'textarea' ? TextareaControl
                : null;

  if (!vueComp) return null;

  const control = {
    component: vueComp,
    props: {
      value: node.data[key] || '',
      label: campo.nombre,
      opciones: campo.opciones || []
    },
    onChange: async (val) => {
      node.data[key] = val;
      console.log(`Campo ${key} cambiado a`, val);

      // 💥 Verifica si este campo dispara una acción declarada
      if (parentConfig?.acciones) {
        const accion = parentConfig.acciones.find(
          a => a.si.campo === key && a.si.valor === val
        );
        if (accion?.entonces?.crear_nodo) {
          const nextConfig = await fetch(`/api/nodos/${accion.entonces.crear_nodo.toLowerCase()}`)
                                  .then(r => r.json());
          const newNode = await this.createNodeFromConfig(nextConfig, [node.position[0] + 300, node.position[1]]);
          await this.editor.addNode(newNode);
          this.editor.view.update();
        }
      }
    }
  };

  return new this.editor.Control(key, control);
},

    sendToCreation() {
      const nodes = Array.from(this.editor.nodes).map(n => ({
        tipo: n.name,
        data: n.data
      }));
      alert(JSON.stringify(nodes, null, 2));
    }
  }
};
</script>
