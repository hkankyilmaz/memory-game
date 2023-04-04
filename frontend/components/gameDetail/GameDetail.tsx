import React from "react";

import styles from "./styles/index.module.scss";
import "./styles/index.module.scss";

import Button from "../ui/button/Button";

import { CountdownCircleTimer } from "react-countdown-circle-timer";

const renderTime = ({ remainingTime }: { remainingTime: number }) => {
  if (remainingTime === 0) {
    return <div className="timer">Too lale...</div>;
  }

  return (
    <div className="timer">
      <div className="text">Remaining</div>
      <div className="value">{remainingTime}</div>
      <div className="text">seconds</div>
    </div>
  );
};

function GameDetail() {
  const [size, setSize] = React.useState(false);
  if (typeof window !== "undefined") {
    window.addEventListener("resize", (event) => {
      if (window.innerWidth < 500 && size == false) setSize(true);
      if (window.innerWidth > 500 && size == true) setSize(false);
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.detailContainer}>
        <div className={styles.timer_}>
          <h1 className={styles.h1}>Time</h1>
          <CountdownCircleTimer
            isPlaying
            duration={15}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[10, 6, 3, 0]}
            onComplete={() => ({ shouldRepeat: true, delay: 1 })}
            size={size ? 100 : 150}
          >
            {renderTime}
          </CountdownCircleTimer>
        </div>
        <div className={styles.score}>
          <h1>Score</h1>
          <hr />
          <table>
            <tbody>
              <tr>
                <th>Name</th>
                <th>True</th>
                <th>False</th>
                <th>Result</th>
              </tr>
              <tr>
                <td>Hakan</td>
                <td>3</td>
                <td>4</td>
                <td>4</td>
              </tr>
              <tr>
                <td>Mehmet</td>
                <td>4</td>
                <td>5</td>
                <td>4</td>
              </tr>
            </tbody>
          </table>
          <div className={styles.buttonContainer}>
            <Button isActive={true} text="Finish Game" />
            <Button isActive={true} text="Pause Game" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameDetail;
