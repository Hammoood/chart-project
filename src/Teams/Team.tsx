import React, { useEffect, useState } from 'react'
import { api_link } from '../teams-api';
import { Chart as ChartsJS, BarElement, LinearScale, CategoryScale } from 'chart.js'
import { Bar  } from 'react-chartjs-2';
import './teams.css'




ChartsJS.register(
  CategoryScale,
  LinearScale,
  BarElement
)

type teamType = 
   [{
    postId: number
    id: number
    name: string
    email: string
    body: string
}]


export default function Team() {

  const [postData, setPostData] = useState<teamType>()



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api_link);
        const data = await response.json();
        setPostData(data);
        console.log(data)
      } catch (error) {
        console.log(error)
      }

    }
    fetchData();
  }, [])

  const postName = postData?.map((el)=> el.email)
  const postNumber = postData?.map((el)=> el.postId)


  
  const chart1 = {
    labels: postName,
    datasets: [{
      label: '# of Votes',
      data:postNumber,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderWidth: 1
    }]
  }
  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    },
    legend: {
      labels: {
        fontSize: 24,
      }
    }
  }
  return (
    <div className='div'>
      <Bar data={chart1} options={options} height={400} />
    </div>
  )
}
