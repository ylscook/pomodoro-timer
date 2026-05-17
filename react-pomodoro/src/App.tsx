import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause, FaRedo, FaForward, FaCog, FaChartLine } from 'react-icons/fa';
import './App.css';

type TimerMode = 'work' | 'shortBreak' | 'longBreak';

const PomodoroTimer: React.FC = () => {
  // 状态管理
  const [workMinutes, setWorkMinutes] = useState<number>(25);
  const [shortBreakMinutes, setShortBreakMinutes] = useState<number>(5);
  const [longBreakMinutes, setLongBreakMinutes] = useState<number>(15);
  const [longBreakInterval, setLongBreakInterval] = useState<number>(4);

  const [currentMode, setCurrentMode] = useState<TimerMode>('work');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(workMinutes * 60);
  const [completedSessions, setCompletedSessions] = useState<number>(0);
  const [sessionCount, setSessionCount] = useState<number>(0);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  // 引用
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // 初始化时间
  useEffect(() => {
    setTimeLeft(currentMode === 'work' ? workMinutes * 60 :
                currentMode === 'shortBreak' ? shortBreakMinutes * 60 :
                longBreakMinutes * 60);
  }, [currentMode, workMinutes, shortBreakMinutes, longBreakMinutes]);

  // 处理计时器逻辑
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  // 处理计时器完成
  const handleTimerComplete = () => {
    setIsRunning(false);
    playNotificationSound();

    if (currentMode === 'work') {
      setCompletedSessions((prev) => prev + 1);
      setSessionCount((prev) => prev + 1);
    }

    // 自动切换到休息模式
    setTimeout(() => {
      switchMode();
    }, 3000);
  };

  // 切换模式
  const switchMode = () => {
    if (currentMode === 'work') {
      if (sessionCount % longBreakInterval === 0) {
        setCurrentMode('longBreak');
      } else {
        setCurrentMode('shortBreak');
      }
    } else {
      setCurrentMode('work');
    }
  };

  // 开始计时
  const startTimer = () => {
    setIsRunning(true);
  };

  // 暂停计时
  const pauseTimer = () => {
    setIsRunning(false);
  };

  // 重置计时器
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(currentMode === 'work' ? workMinutes * 60 :
                currentMode === 'shortBreak' ? shortBreakMinutes * 60 :
                longBreakMinutes * 60);
  };

  // 跳过当前模式
  const skipMode = () => {
    setIsRunning(false);
    switchMode();
  };

  // 播放通知声音
  const playNotificationSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  // 格式化时间显示
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 计算进度
  const getProgress = (): number => {
    const totalTime = currentMode === 'work' ? workMinutes * 60 :
                      currentMode === 'shortBreak' ? shortBreakMinutes * 60 :
                      longBreakMinutes * 60;
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  // 保存设置到本地存储
  const saveSettings = () => {
    const settings = {
      workMinutes,
      shortBreakMinutes,
      longBreakMinutes,
      longBreakInterval
    };
    localStorage.setItem('pomodoroSettings', JSON.stringify(settings));
    setShowSettings(false);
  };

  return (
    <div className="container">
      <h1>番茄工作法</h1>

      {/* 控制按钮 */}
      <div className="controls">
        <button onClick={showSettings ? null : setShowSettings}>
          <FaCog /> 设置
        </button>
        <button onClick={showSettings ? setShowSettings : null}>
          <FaChartLine /> 统计
        </button>
      </div>

      {/* 设置面板 */}
      {showSettings && (
        <div className="settings-panel">
          <h3>设置</h3>
          <div className="setting-item">
            <label>工作时间（分钟）</label>
            <input
              type="number"
              value={workMinutes}
              onChange={(e) => setWorkMinutes(Number(e.target.value))}
              min="1"
              max="60"
            />
          </div>
          <div className="setting-item">
            <label>短休息（分钟）</label>
            <input
              type="number"
              value={shortBreakMinutes}
              onChange={(e) => setShortBreakMinutes(Number(e.target.value))}
              min="1"
              max="30"
            />
          </div>
          <div className="setting-item">
            <label>长休息（分钟）</label>
            <input
              type="number"
              value={longBreakMinutes}
              onChange={(e) => setLongBreakMinutes(Number(e.target.value))}
              min="1"
              max="60"
            />
          </div>
          <div className="setting-item">
            <label>长休息间隔</label>
            <input
              type="number"
              value={longBreakInterval}
              onChange={(e) => setLongBreakInterval(Number(e.target.value))}
              min="2"
              max="10"
            />
          </div>
          <button onClick={saveSettings}>保存设置</button>
        </div>
      )}

      {/* 模式指示器 */}
      <div className={`mode-indicator ${currentMode}`}>
        {currentMode === 'work' && '工作时间'}
        {currentMode === 'shortBreak' && '短休息'}
        {currentMode === 'longBreak' && '长休息'}
      </div>

      {/* 进度环 */}
      <div className="progress-container">
        <svg className="progress-ring" width="200" height="200">
          <circle
            className="progress-ring-bg"
            cx="100"
            cy="100"
            r="90"
          />
          <circle
            className="progress-ring-progress"
            cx="100"
            cy="100"
            r="90"
            stroke={currentMode === 'work' ? '#e53e3e' :
                   currentMode === 'shortBreak' ? '#38a169' : '#3182ce'}
            strokeDasharray={2 * Math.PI * 90}
            strokeDashoffset={2 * Math.PI * 90 * (1 - getProgress() / 100)}
            strokeLinecap="round"
            transform="rotate(-90 100 100)"
          />
        </svg>
        <div className="timer-display">{formatTime(timeLeft)}</div>
      </div>

      {/* 控制按钮 */}
      <div className="controls">
        {!isRunning ? (
          <button onClick={startTimer}>
            <FaPlay /> 开始
          </button>
        ) : (
          <button onClick={pauseTimer}>
            <FaPause /> 暂停
          </button>
        )}
        <button onClick={resetTimer}>
          <FaRedo /> 重置
        </button>
        <button onClick={skipMode}>
          <FaForward /> 跳过
        </button>
      </div>

      {/* 统计信息 */}
      <div className="stats">
        <div className="stat-item">
          <div className="stat-value">{completedSessions}</div>
          <div className="stat-label">已完成番茄</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{sessionCount}</div>
          <div className="stat-label">今日番茄</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{Math.floor(timeLeft / 60)}</div>
          <div className="stat-label">剩余分钟</div>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;