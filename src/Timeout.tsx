import { useTimer } from 'react-compound-timer';
import { differenceInMilliseconds } from 'date-fns';

const sessionTimeout: number = 60000;
const sessionWarning: number = 20000;
const sessionExpired: number = 2000;

export const Timeout = () => {

    const getRemainingTime = () => {
        const lastResponse = sessionStorage.getItem('last_successful_server_response');
        if (lastResponse) {
            const lastResponseMs = parseInt(lastResponse, 10);
            return sessionTimeout - differenceInMilliseconds(Date.now(), lastResponseMs);
        }
    }

    const handleSession = () => {
        const remainingTime = getRemainingTime();
        if (remainingTime) {
            if (remainingTime > sessionWarning) {
                setTime(remainingTime);
            } else if (remainingTime > sessionExpired) {
                alert("Session about to expire in 20 seconds!");
            } else {
                alert("Session expired!");
            }
        }
    }

    const {
        controls: { setTime }
      } = useTimer({ 
            initialTime: getRemainingTime(),
            direction: "backward",
            startImmediately: true,
            checkpoints: [
                {
                    time: sessionWarning,
                    callback: () => {
                        handleSession();
                    },
                },
                {
                    time: sessionExpired,
                    callback: () => {
                        handleSession();
                    }
                }
            ],

        });    

    return null;
}
