exports.seed = async function (knex) {
  await knex('exercises').del()
  await knex('exercises').insert([
    {
      name: 'Supino inclinado com barra',
      group: 'peito',
      demo: 'supino_inclinado_com_barra.gif',
      thumb: 'supino_inclinado_com_barra.png',
    },
    {
      name: 'Crucifixo reto',
      group: 'peito',
      demo: 'crucifixo_reto.gif',
      thumb: 'crucifixo_reto.png'
    },
    {
      name: 'Supino reto com barra',
      group: 'peito',
      demo: 'supino_reto_com_barra.gif',
      thumb: 'supino_reto_com_barra.png'
    },
    {
      name: 'Supino reto com halteres',
      group: 'peito',
      demo: 'supino_reto_com_halteres.gif',
      thumb: 'supino_reto_com_halteres.png'
    },
    {
      name: 'Pullover',
      group: 'peito',
      demo: 'pullover.gif',
      thumb: 'pullover.png'
    },
    {
      name: 'Crucifixo com banco inclinado',
      group: 'peito',
      demo: 'crucifixo_banco_inclinado.gif',
      thumb: 'crucifixo_banco_inclinado.png'
    },
    {
      name: 'Francês deitado com halteres',
      group: 'tríceps',
      demo: 'frances_deitado_com_halteres.gif',
      thumb: 'frances_deitado_com_halteres.png'
    },
    {
      name: 'Corda Cross',
      group: 'tríceps',
      demo: 'corda_cross.gif',
      thumb: 'corda_cross.png'
    },
    {
      name: 'Barra Cross',
      group: 'tríceps',
      demo: 'barra_cross.gif',
      thumb: 'barra_cross.png'
    },
    {
      name: 'Tríceps testa',
      group: 'tríceps',
      demo: 'triceps_testa.gif',
      thumb: 'triceps_testa.png'
    },
    {
      name: 'Levantamento terra',
      group: 'costas',
      demo: 'levantamento_terra.gif',
      thumb: 'levantamento_terra.png'
    },
    {
      name: 'Barra fixa',
      group: 'costas',
      demo: 'barra_fixa.gif',
      thumb: 'barra_fixa.png'
    },
    {
      name: 'Puxada alta com o triângulo',
      group: 'costas',
      demo: 'puxada_pulley_triangulo.gif',
      thumb: 'puxada_pulley_triangulo.png'
    },
    {
      name: 'Pulley frontal',
      group: 'costas',
      demo: 'pulley_frontal.gif',
      thumb: 'pulley_frontal.png'
    },
    {
      name: 'Pulley atrás',
      group: 'costas',
      demo: 'pulley_atras.gif',
      thumb: 'pulley_atras.png'
    },
    {
      name: 'Remada baixa',
      group: 'costas',
      demo: 'remada_baixa.gif',
      thumb: 'remada_baixa.png'
    },
    {
      name: 'Serrote',
      group: 'costas',
      demo: 'serrote.gif',
      thumb: 'serrote.png'
    },
    {
      name: 'Remada curvada',
      group: 'costas',
      demo: 'remada_curvada.gif',
      thumb: 'remada_curvada.png'
    },
    {
      name: 'Remada cavalinho',
      group: 'costas',
      demo: 'remada_cavalinho.gif',
      thumb: 'remada_cavalinho.png'
    },
    {
      name: 'Rosca alternada com banco inclinado',
      group: 'bíceps',
      demo: 'rosca_alternada_com_banco_inclinado.gif',
      thumb: 'rosca_alternada_com_banco_inclinado.png'
    },
    {
      name: 'Rosca Scott barra w',
      group: 'bíceps',
      demo: 'rosca_scott_barra_w.gif',
      thumb: 'rosca_scott_barra_w.png'
    },
    {
      name: 'Rosca direta barra reta',
      group: 'bíceps',
      demo: 'rosca_direta_barra_reta.gif',
      thumb: 'rosca_direta_barra_reta.png'
    },
    {
      name: 'Martelo em pé',
      group: 'bíceps',
      demo: 'martelo_em_pe.gif',
      thumb: 'martelo_em_pe.png'
    },
    {
      name: 'Rosca punho',
      group: 'antebraço',
      demo: 'rosca_punho.gif',
      thumb: 'rosca_punho.png'
    },
    {
      name: 'Leg press 45 graus',
      group: 'pernas',
      demo: 'leg_press_45_graus.gif',
      thumb: 'leg_press_45_graus.png'
    },
    {
      name: 'Extensor de pernas',
      group: 'pernas',
      demo: 'extensor_de_pernas.gif',
      thumb: 'extensor_de_pernas.png'
    },
    {
      name: 'Abdutora',
      group: 'pernas',
      demo: 'abdutora.gif',
      thumb: 'abdutora.png'
    },
    {
      name: 'Stiff',
      group: 'pernas',
      demo: 'stiff.gif',
      thumb: 'stiff.png',
    },
    {
      name: 'Agachamento com barra',
      group: 'pernas',
      demo: 'agachamento_com_barra.gif',
      thumb: 'agachamento_com_barra.png',
    },
    {
      name: 'Elevação de panturrilha no leg press',
      group: 'panturrilha',
      demo: 'panturrilha_no_leg_press.gif',
      thumb: 'panturrilha_no_leg_press.png',
    },
    {
      name: 'Elevação de panturrilha em pé',
      group: 'panturrilha',
      demo: 'elevacao_panturrilha_em_pe.gif',
      thumb: 'elevacao_panturrilha_em_pe.png',
    },
    {
      name: 'Neck Press',
      group: 'ombro',
      demo: 'neck-press.gif',
      thumb: 'neck-press.png'
    },
    {
      name: 'Desenvolvimento maquina',
      group: 'ombro',
      demo: 'desenvolvimento_maquina.gif',
      thumb: 'desenvolvimento_maquina.png'
    },
    {
      name: 'Elevação lateral com halteres sentado',
      group: 'ombro',
      demo: 'elevacao_lateral_com_halteres_sentado.gif',
      thumb: 'elevacao_lateral_com_halteres_sentado.png'
    },
    {
      name: 'Encolhimento com halteres',
      group: 'trapézio',
      demo: 'encolhimento_com_halteres.gif',
      thumb: 'encolhimento_com_halteres.png'
    },
    {
      name: 'Encolhimento com barra',
      group: 'trapézio',
      demo: 'encolhimento_com_barra.gif',
      thumb: 'encolhimento_com_barra.png'
    }
  ]);
};