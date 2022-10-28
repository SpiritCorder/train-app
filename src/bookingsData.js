import {collection, addDoc} from 'firebase/firestore';
import {db} from './config/firebase';

const bookings =  [
    // yaldevi
    {
        customerId: '3Tk85xbkOQgdp5gbBxg1',
        trainId: '04bDOsFxKLvArDTqRxe8',
        bookings: {
            firstClass: {
                seats: 4,
                total: (4 * 3500)
            },
            secondClass: {
                seats: 2,
                total: (4 * 800)
            }
        }
    },
    {
        customerId: '1Uj0l04Ieg9ADysPgDKf',
        trainId: '04bDOsFxKLvArDTqRxe8',
        bookings: {
            secondClass: {
                seats: 6,
                total: (6 * 800)
            }
        }
    },
    {
        customerId: 'K21relCT5ryBmPXrcHLj',
        trainId: '04bDOsFxKLvArDTqRxe8',
        bookings: {
            firstClass: {
                seats: 1,
                total: (1 * 3500)
            },
            secondClass: {
                seats: 7,
                total: (7 * 800)
            }
        }
    },
    // udarata manike
    {
        customerId: 'MjtFUnwlo9CbROTTDhZi',
        trainId: 'wdfwICiICsbRIlutZtQH',
        bookings: {
            firstClass: {
                seats: 2,
                total: (2 * 1500)
            },
            secondClass: {
                seats: 8,
                total: (8 * 600)
            }
        }
    },
    {
        customerId: 'MjtFUnwlo9CbROTTDhZi',
        trainId: 'wdfwICiICsbRIlutZtQH',
        bookings: {
            firstClass: {
                seats: 1,
                total: (1 * 1500)
            }
        }
    },

]

function loadBookingData() {
    bookings.forEach(b => {
        const colRef = collection(db, 'bookings');
        addDoc(colRef, b)
    })
}

export default loadBookingData;