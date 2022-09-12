import React from 'react'
import './addTrain.css';

export default function AddTrainForm() {
  return (
    <div className='add-new-train-card'>
        <div className="form-topic">
            <p>Add New Train</p>
        </div>
        <div className="form-content">

            <div className="train-title-row">
                    <div className="train-title">
                        <label>Train Title</label>
                        <input type='text' placeholder='Enter Train Title'/>
                    </div>
            </div>

            <div className="start-end-points">
                <div className="train-start-point">
                    <label>Start Point</label>
                    <input type='text' placeholder='Enter Start Point'/>
                </div>

                <div className="tarin-end-point">
                    <label>End Point</label>
                    <input type='text' placeholder='Enter End Point'/>
                </div>
            </div>

            <div className="start-end-time">
                <div className="train-start-time">
                    <label>Start time</label>
                    <input type='time'/>
                </div>

                <div className="train-stop-time">
                    <label>Stop time</label>
                    <input type='time'/>
                </div>
            </div>

            <div className="button-row">
                <button>Add Train</button>
            </div>

        </div>
    </div>
  )
}
