# 香橙派AIpro 安装 Intel Realsense D456 深度相机完整指南

> 📝 **记录一次完整的踩坑与解决过程**

---

## 📋 前言

因为项目需要使用**香橙派AIpro**和 **Intel Realsense D456 深度相机**部署，运行目标检测算法和坐标变换。在安装过程中遇到了：
- ❌ 版本错误
- ❌ 编译失败  
- ❌ `pyrealsense2` 报错：No device found

在昇腾论坛上没有找到好的帖子，咨询商家无果后，在CSDN和GitHub上查阅大量资料后终于安装成功。希望这篇博客能帮助到大家！

**开发板：** 香橙派AIpro（8T）  
**系统：** Ubuntu 22.04  
**深度相机：** Intel Realsense D456

---

## 🔧 一、安装 librealsense SDK

因为 Intel 官方没有 ARM 架构的安装包，所以需要我们自己进行编译安装驱动。

### 1️⃣ 检查版本

**这一步尤为重要！！！** 错误的版本会导致编译安装失败，可以根据自己的相机型号在 Realsense 官网或 GitHub Release 里查找对应的版本。

**GitHub：** [Releases · IntelRealSense/librealsense](https://github.com/IntelRealSense/librealsense/releases)

**Realsense 官方文档：** [RealSense Documentation](https://dev.realsenseai.com/docs/docs-get-started)

![版本选择](static/assets/img/blog/1756403271835.png)
*在GitHub Release页面选择合适的版本*

### 2️⃣ 获取代码

可以选择下载 Release 代码或者 git clone 代码仓库：

**下载 Release 代码：**

![下载Release](static/assets/img/blog/1756403498072.png)
*直接下载对应版本的源码压缩包*

**或使用 git clone：**

```bash
git clone https://github.com/IntelRealSense/librealsense.git
cd librealsense
git checkout v2.56.5
```

> 💡 建议选择下载 Release 代码，两种方法都可以。

### 3️⃣ 编译安装

**安装依赖项：**

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install git cmake libssl-dev libusb-1.0-0-dev pkg-config libgtk-3-dev
sudo apt-get install libglfw3-dev libgl1-mesa-dev libglu1-mesa-dev
```

**编译：**

创建构建目录并编译：

```bash
mkdir build && cd build
```

```bash
cmake .. \
  -DCMAKE_BUILD_TYPE=Release \
  -DBUILD_EXAMPLES=ON \
  -DBUILD_GRAPHICAL_EXAMPLES=OFF \
  -DFORCE_LIBUVC=ON \
  -DBUILD_PYTHON_BINDINGS=ON \
  -DBUILD_WITH_CUDA=OFF \
  -DBUILD_SHARED_LIBS=ON \
  -DBUILD_NETWORK_DEVICE=OFF
```

**参数说明：**

| 参数 | 说明 |
|------|------|
| `-DBUILD_EXAMPLES=ON` | 编译 C++ 示例，方便后续测试 |
| `-DBUILD_GRAPHICAL_EXAMPLES=OFF` | 关闭图形化例子，节省资源 |
| `-DFORCE_LIBUVC=ON` | 在 ARM 设备上常用，强制用 libuvc 驱动 |
| `-DBUILD_PYTHON_BINDINGS=ON` | 需要 Python 接口时打开 |
| `-DBUILD_WITH_CUDA=OFF` | 无 NVIDIA GPU 时关闭 CUDA |
| `-DBUILD_SHARED_LIBS=ON` | 生成动态库 |
| `-DBUILD_NETWORK_DEVICE=OFF` | 如无网络摄像头可关闭 |

**开始编译：**

```bash
make -j$(nproc)
```

**安装：**

```bash
sudo make install
```

**Udev 规则配置：**

```bash
sudo cp ../config/99-realsense-libusb.rules /etc/udev/rules.d/
sudo udevadm control --reload-rules && sudo udevadm trigger
```

### 4️⃣ 测试

插上 RealSense 设备，运行：

```bash
lsusb
```

![lsusb输出](static/assets/img/blog/1756405433217.png)
*查看设备是否被识别*

运行：

```bash
rs-enumerate-devices
```

![设备参数](static/assets/img/blog/1756405453947.png)
*显示相机参数说明安装成功*

如果可以显示相机的参数，则 SDK 安装成功！🎉

---

## 🐍 二、安装 pyrealsense2

### 1️⃣ 编译

```bash
cd /librealsense/build   # 根据实际路径修改
cmake ../ \
  -DFORCE_RSUSB_BACKEND=ON \
  -DBUILD_EXAMPLES=OFF \
  -DBUILD_GRAPHICAL_EXAMPLES=OFF \
  -DBUILD_PYTHON_BINDINGS=ON \
  -DPYTHON_EXECUTABLE=$(which python3) \
  -DCMAKE_BUILD_TYPE=Release

make -j$(nproc)     # 编译
```

### 2️⃣ 安装

```bash
sudo make install
```

### 3️⃣ 测试

```python
import pyrealsense2 as rs
print(rs.__version__)
```

### 4️⃣ 解决 "No device found" 错误

![错误截图](static/assets/img/blog/1756405205116.png)
*运行时出现 No device found 错误*

**解决方法：**

将 `/usr/lib/python3/dist-packages/pyrealsense2/` 下的库文件复制粘贴到脚本目录下：

![复制库文件](static/assets/img/blog/1756405319508.png)
*复制所需的 .so 库文件到项目目录*

再次运行：

![运行成功](static/assets/img/blog/1756405349856.png)
*成功读取到设备信息！*

---

## 📚 参考链接

- [香橙派AIpro测评：快速部署SLAM算法](https://blog.csdn.net/qq_45049500/article/details/140136108)
- [ARM安装pyrealsense教程](https://blog.csdn.net/crazty/article/details/129355717)
- [在树莓派5上安装Intel RealSense Python封装的完整指南](https://blog.gitcode.com/7864934797032a8eae4426566883301b.html)
- [AttributeError: module 'pyrealsense2' has no attribute 'pipeline' 解决方案](https://blog.csdn.net/kanhao100/article/details/119820817)
- [树莓派4b+部署realsense的踩坑问题小记](https://blog.csdn.net/yanweiqi1754989931/article/details/128815248)

---

## ✅ 总结

通过这篇博客，我们完成了：

1. ✅ 在香橙派AIpro上编译安装 librealsense SDK
2. ✅ 成功安装 pyrealsense2 Python 绑定
3. ✅ 解决 "No device found" 常见问题

如果在安装过程中遇到问题，欢迎留言交流！

> 💬 **联系方式**
> - 📧 Email: leexii798@gmail.com
> - 🐙 GitHub: [joijndysq](https://github.com/joijndysq)

---

*📝 发表于 2024年 | 嵌入式开发 & 机器视觉*
