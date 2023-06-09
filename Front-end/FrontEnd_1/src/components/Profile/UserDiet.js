import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_URL } from '../common/URL'

const UserDiet = () => {

    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')

    const [allDietPlan, setAllDietPlan] = useState([])

    var id = localStorage.getItem("id");


    const [BMIPLAN, setBMIPLAN] = useState('')
    const [dietname, setdietname] = useState('')

    var BMI1;
    
    
    const CalBMI = () => {
 
        var m = Number(height)/ 100;
        var BMI = Number(weight) / (m * m);
        BMI1=BMI;
        console.log(typeof( BMI));
        console.log((BMI));
        if (BMI.toPrecision(3) <= 0) {
            setBMIPLAN('Fill Profile Details')
            setdietname('')
        }
        else if (BMI < 18.5) {
            setBMIPLAN('UNDERWEIGHT')
            setdietname('Underweight')
        }
        else if (BMI.toPrecision(3) > 18.5 && BMI.toPrecision(3) < 24.9) {
            setBMIPLAN('NORMAL')
            setdietname('Fit')
        }
        else if (BMI.toPrecision(3) > 25 && BMI.toPrecision(3) < 29.9) {
            setBMIPLAN('OVERWEIGHT')
            setdietname('Overweight')
        }
        else {
            setBMIPLAN('OBESE')
            setdietname('Overweight')
        }
    }

    useEffect(() => {

       
        axios.get(`${API_URL}getAllInfo/${id}`)
        .then((response) => {
            console.log(response.data.data )
            
            setHeight(response.data.data.height)
            setWeight(response.data.data.weight)
            CalBMI();
        })
        
        // console.log((BMI));
        
        axios.get(API_URL + "getAllDietItems")
        .then((response) => {
            console.log(response.data.data )
            setAllDietPlan(response.data.data)
           // console.log((BMI));
        })
    },[])



    return (
        
        <div>

            <div className='text-center'>
                {
                    <span>
                        <h3>Your Body Mass Index is </h3>
                        <h5>According To your BMI You are
                            <b className='text-success'> {BMIPLAN} </b></h5>
                        <h6>According To Expert Trainer Follow This Diet</h6>
                    </span>
                }
            </div>

            <table class="table table-bordered "  >
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Day</th>
                        <th scope="col">Morning</th>
                        <th scope="col">Afternoon</th>
                        <th scope="col">Evening</th>
                        <th scope="col">Night</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allDietPlan.map((val) => {
                            if (val.dietName == dietname) {
                                return <tr key={val.id}>
                                    <td>{val.day}</td>
                                    <td>{val.morning}</td>
                                    <td>{val.afternoon}</td>
                                    <td>{val.evening}</td>
                                    <td>{val.night}</td>
                                </tr>
                            }
                            else {
                                <h1>No Plan</h1>
                            }

                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
export default UserDiet