## 🚀 开源项目

这里整理了我在机器人、多模态视觉、嵌入式通信与控制方向的代表性公开项目。项目按与个人技术方向的相关性排列，课程练习、资料镜像和私有研究仓库未列入。

### 🤖 [AgiBot D1 工作区](https://github.com/joijndysq/agibot_d1_ws)

智元 D1 机器人相关的 ROS 2 工作区与控制开发；代码和文档仍在迭代。

---

### ✋ [灵巧手工作区](https://github.com/joijndysq/hand_ws)

灵巧手模型与运动规划相关的 ROS 2 实践；项目详情以仓库当前内容为准。

---

### 🔥 [Multimodal Detect](https://github.com/joijndysq/multimodal_detect)

面向火焰检测与机器人感知的多模态系统项目，围绕可见光、红外与深度信息融合开展检测、跟踪和空间定位实践。

- **主要内容**：多模态目标检测、视频流处理、目标轨迹平滑与系统通信
- **技术栈**：Python、PyTorch、YOLO、OpenCV、Kalman Filter
- **项目定位**：多模态火焰检测系统的集成与实验仓库

---

### 👁️ [TwoStream YOLOv8](https://github.com/joijndysq/TwoStream_Yolov8)

面向可见光与热红外图像的双流 YOLOv8 目标检测实现，支持 DroneVehicle 等配对数据集的训练和评估。

- **主要内容**：双模态输入、HBB / OBB 检测、数据预处理、热力图与结果对比
- **部署能力**：ONNX 导出、TensorRT 推理、INT8 校准与量化
- **技术栈**：Python、PyTorch、Ultralytics、ONNX、TensorRT

---

### 🦾 [arm_ws](https://github.com/joijndysq/arm_ws)

面向六轴机械臂的 ROS 2 完整工作区，覆盖模型、规划、通信、下位机固件和调参工具。

- **机器人模型**：URDF、网格资源与 RViz 可视化
- **运动规划**：MoveIt 2 配置，支持假硬件和真实机械臂
- **软硬件通信**：将 FollowJointTrajectory 指令通过串口转发至 ESP32
- **下位机**：ESP32-S3、PCA9685 舵机控制、零点与限位参数保存
- **技术栈**：ROS 2 Humble、MoveIt 2、Python、C++、PlatformIO

---

### 🤖 [my_baxter](https://github.com/joijndysq/my_baxter)

Baxter 双臂机器人课程实践项目，在 Ubuntu 22.04 上使用 Docker 运行 ROS Noetic 环境。

- **主要内容**：Baxter 机器人开发环境、ROS Noetic 与容器化工作流
- **技术栈**：ROS、Docker、Ubuntu、Python
- **项目类型**：自动化综合课程设计与机器人实验

---

### 📡 Modbus 通信实验

工业通信协议的主站与从站实现，用于学习 Modbus 数据交互和设备控制流程。

- [Modbus Master](https://github.com/joijndysq/Modbus_Master) — 主站通信与控制逻辑
- [Modbus Server](https://github.com/joijndysq/Modbus_Server) — 从站 / 服务端数据响应
- **技术方向**：工业通信、寄存器读写、设备联调

---

### 🎛️ [State Space Experiment](https://github.com/joijndysq/stateSpaceExperiment)

围绕现代控制理论与状态空间方法整理的课程实验项目。

- **主要内容**：状态空间建模、系统响应与控制实验
- **技术方向**：自动控制、系统分析、仿真实验

---

### 🧠 [YOLO Cat on Ascend](https://github.com/joijndysq/yolo_cat_ascend)

面向昇腾平台的 YOLO 目标检测部署实践，以猫类目标识别为验证任务。

- **主要内容**：模型推理流程与 AI 平台适配
- **技术方向**：YOLO、计算机视觉、Ascend AI

---

## 📌 其他说明

- 部分研究项目仍处于迭代阶段，代码和文档会持续完善。
- 私有仓库不会在公开主页中提供无效链接。
- 更多代码可查看我的 [GitHub 仓库主页](https://github.com/joijndysq?tab=repositories)。

> 如果你对机器人、多模态视觉、ROS 或嵌入式系统感兴趣，欢迎通过 GitHub Issue 或邮件交流。
