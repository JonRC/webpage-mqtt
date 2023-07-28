'use client'

//Lotei os arquivos de comentários para fins didáticos, sinta-se a vontade para removê-los

import { Metric } from '@/components/Metric'
import styles from './page.module.css'
import * as mqtt from 'mqtt'
import { useEffect, useState } from 'react'

const TEMPERATURE_TOPIC = 'esp32/temperature'
const HUMIDITY_TOPIC = 'esp32/humidity'

export default function Home() {

  const [metrics, setMetrics] = useState({ //Cria o state metrics. setMetrics é usado para atualizar metrics.
    temperature: '', //valor inicial da temperature, string vazia
    humidity: '' //valor inicial da humidade, string vazia
  })

  useEffect(() => {
    const client = mqtt.connect('ws://localhost:8080') //connecta ao mqtt broker
    client.on('connect', handleConnection) //Ao conectar chama a função `handleConnection`

    function handleConnection () {
      client.subscribe(TEMPERATURE_TOPIC) //Escuta o tópico de temperatura
      client.subscribe(HUMIDITY_TOPIC) //Escuta o tópico de humidade

      client.on('message', (topic, message) => { //Ao recebem mensagem, executa essa função que recebe a mensagem que e seu topico
        if(topic === TEMPERATURE_TOPIC) setMetrics(metrics => ({ //atualiza metrics para
          ...metrics, //usa os valores já existentes
          temperature: message.toString() //altera o valor da temperatura
        }))

        debugger

        if(topic === HUMIDITY_TOPIC) setMetrics(metrics => ({
          ...metrics, //usa os valores já existentes
          humidity: message.toString() //altera o valor da humidade
        }))
      })
    }
  }, [])

  return (
    <main className={styles.main}>
      <Metric title='Temperature'> {/* Usa o componente Metric passando o título */}
        {metrics.temperature} {/* Conteúdo do componente Metric */}
      </Metric>

      <Metric title='Humidity'>
        {metrics.humidity}
      </Metric>
    </main>
  )
}
