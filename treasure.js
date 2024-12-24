document.addEventListener("DOMContentLoaded", () => {
  const progress = document.getElementById("progress");
  const taskContainer = document.getElementById("task-container");
  const startBtn = document.getElementById("start-btn");
  const playerName = document.getElementById('player-name');
  const playerLevel = document.getElementById('player-level');
  const playerTotalScore = document.getElementById('player-total-score');
  const scoreHistoryList = document.getElementById('score-history-list');

  const playerInfo = {
    name: 'Player1',
    level: 1,
    totalScore: 0
  };
  const scoreHistory = [];

  // 异步任务数组
  const tasks = [
    { name: "攀爬陡峭山峰", duration: 2000 },
    { name: "穿越炽热沙漠", duration: 2000 },
    { name: "探索古老遗迹", duration: 2000 },
    { name: "勇渡湍急河流", duration: 2000 },
    { name: "战胜凶猛野兽", duration: 1000 },
    { name: "寻找神秘魔法石", duration: 1500 },
    { name: "解开魔法封印", duration: 1500 },
    { name: "逃离黑暗洞穴", duration: 1000 }
  ];

  // 执行异步任务
  async function startAdventure() {
    startBtn.style.display = "none"; // 隐藏开始按钮
    let completedTasks = 0;
    let taskScore = 0;
    for (let task of tasks) {
      // 更新任务状态
      await performTask(task);
      completedTasks++;
      taskScore += 100; // 假设每个任务完成得100分
      updateProgress((completedTasks / tasks.length) * 100); // 更新进度条
    }
    playerInfo.totalScore += taskScore;
    scoreHistory.push(taskScore);

    // 冒险完成
    taskContainer.innerHTML = `<h2>通关成功！！！</h2>`;
    taskContainer.classList.add("complete");

    // 更新玩家信息和得分历史记录显示
    updatePlayerInfo();
    updateScoreHistory();
  }

  // 执行单个任务
  function performTask(task) {
    return new Promise((resolve) => {
      // 动态显示任务
      const taskElement = document.createElement("div");
      taskElement.textContent = `任务进行中：${task.name}...`;
      taskContainer.appendChild(taskElement);

      setTimeout(() => {
        taskElement.textContent = `任务完成：${task.name}`;
        taskElement.classList.add("complete");
        resolve(); // 完成任务
      }, task.duration);
    });
  }

  // 更新进度条
  function updateProgress(percent) {
    progress.style.width = `${percent}%`;
  }

  // 更新玩家信息显示
  function updatePlayerInfo() {
    playerName.textContent = playerInfo.name;
    playerLevel.textContent = playerInfo.level;
    playerTotalScore.textContent = playerInfo.totalScore;
  }

  // 更新得分历史记录显示
  function updateScoreHistory() {
    scoreHistoryList.innerHTML = '';
    for (let score of scoreHistory) {
      const li = document.createElement('li');
      li.textContent = score;
      scoreHistoryList.appendChild(li);
    }
  }

  // 绑定开始按钮点击事件
  startBtn.addEventListener("click", startAdventure);

  // 初始化玩家信息显示
  updatePlayerInfo();
});
