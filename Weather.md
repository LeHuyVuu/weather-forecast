# Weather Application

## Giới thiệu

Công Ty Sự Kiện ABC cần xây dựng một ứng dụng dự báo thời tiết nội bộ, với yêu cầu như sau:

- Có thể tìm kiếm và dự báo thời tiết tại một vị trí cụ thể.
  - Có thể tìm kiếm theo đất nước
  - Cho phép chọn vị trí trên bản đồ
- Hiển thị tất cả các thông tin thời tiết, trình bày đẹp và cụ thể trên giao diện
- Có hỗ trợ biểu đồ chart (Chart.js), hỗ trợ hiển thị biến động thời tiết theo ngày
- Tạo 1 trang chart full screen, hiển thị biến động thời tiết theo giờ, giúp nhóm sự kiện nắm bắt thông tin thời tiết một cách cụ thể.

\*\*Chú ý: Do khách hàng không có yêu cầu cụ thể và chi tiết, vậy nên UI/UX tùy thuộc vào sự sáng tạo của team. Lưu ý flow nghiệp vụ phải được đảm bảo tính hợp lý.

## Enviroment

- APP_ID : `5796abbde9106b7da4febfae8c44c232`

## API

City : https://api.openweathermap.org/data/2.5/find?q=`KEY_SEARCH`&appid=`APP_ID`

```
https://api.openweathermap.org/data/2.5/find?q=vietnam&appid=5796abbde9106b7da4febfae8c44c232
```

Forecast : https://api.openweathermap.org/data/2.5/onecall?lat=`LAT`&lon=`LONG`&appid=`APP_ID`

```
https://api.openweathermap.org/data/2.5/onecall?lat=16.1667&lon=107.8333&appid=5796abbde9106b7da4febfae8c44c232
```

Flag : https://openweathermap.org/images/flags/`COUNTRY`.png

```
https://openweathermap.org/images/flags/vn.png
```

Icon : https://openweathermap.org/img/wn/`ICON`@2x.png

```
https://openweathermap.org/img/wn/10d@2x.png
```




### **Danh sách URL cho các mã biểu tượng thời tiết từ OpenWeatherMap:**

- **01d** - Trời quang đãng (ban ngày)  
  ![01d](https://openweathermap.org/img/wn/01d@2x.png)
  
- **01n** - Trời quang đãng (ban đêm)  
  ![01n](https://openweathermap.org/img/wn/01n@2x.png)
  
- **02d** - Ít mây (ban ngày)  
  ![02d](https://openweathermap.org/img/wn/02d@2x.png)
  
- **02n** - Ít mây (ban đêm)  
  ![02n](https://openweathermap.org/img/wn/02n@2x.png)
  
- **03d** - Mây rải rác (ban ngày)  
  ![03d](https://openweathermap.org/img/wn/03d@2x.png)
  
- **03n** - Mây rải rác (ban đêm)  
  ![03n](https://openweathermap.org/img/wn/03n@2x.png)
  
- **04d** - Mây dày (ban ngày)  
  ![04d](https://openweathermap.org/img/wn/04d@2x.png)
  
- **04n** - Mây dày (ban đêm)  
  ![04n](https://openweathermap.org/img/wn/04n@2x.png)
  
- **09d** - Mưa rào (ban ngày)  
  ![09d](https://openweathermap.org/img/wn/09d@2x.png)
  
- **09n** - Mưa rào (ban đêm)  
  ![09n](https://openweathermap.org/img/wn/09n@2x.png)
  
- **10d** - Mưa (ban ngày)  
  ![10d](https://openweathermap.org/img/wn/10d@2x.png)
  
- **10n** - Mưa (ban đêm)  
  ![10n](https://openweathermap.org/img/wn/10n@2x.png)
  
- **11d** - Giông bão (ban ngày)  
  ![11d](https://openweathermap.org/img/wn/11d@2x.png)
  
- **11n** - Giông bão (ban đêm)  
  ![11n](https://openweathermap.org/img/wn/11n@2x.png)
  
- **13d** - Tuyết (ban ngày)  
  ![13d](https://openweathermap.org/img/wn/13d@2x.png)
  
- **13n** - Tuyết (ban đêm)  
  ![13n](https://openweathermap.org/img/wn/13n@2x.png)
  
- **50d** - Sương mù (ban ngày)  
  ![50d](https://openweathermap.org/img/wn/50d@2x.png)
  
- **50n** - Sương mù (ban đêm)  
  ![50n](https://openweathermap.org/img/wn/50n@2x.png)

---

### **Danh sách một số URL cờ quốc gia:**

- **Việt Nam (VN)**  
  ![Vietnam Flag](https://openweathermap.org/images/flags/vn.png)
  
- **Hoa Kỳ (US)**  
  ![USA Flag](https://openweathermap.org/images/flags/us.png)
  
- **Anh (GB)**  
  ![UK Flag](https://openweathermap.org/images/flags/gb.png)
  
- **Nhật Bản (JP)**  
  ![Japan Flag](https://openweathermap.org/images/flags/jp.png)
  
- **Hàn Quốc (KR)**  
  ![South Korea Flag](https://openweathermap.org/images/flags/kr.png)
  
- **Trung Quốc (CN)**  
  ![China Flag](https://openweathermap.org/images/flags/cn.png)
  
- **Pháp (FR)**  
  ![France Flag](https://openweathermap.org/images/flags/fr.png)
  
- **Đức (DE)**  
  ![Germany Flag](https://openweathermap.org/images/flags/de.png)
  
- **Nga (RU)**  
  ![Russia Flag](https://openweathermap.org/images/flags/ru.png)
  
- **Ấn Độ (IN)**  
  ![India Flag](https://openweathermap.org/images/flags/in.png)
  
- **Brazil (BR)**  
  ![Brazil Flag](https://openweathermap.org/images/flags/br.png)
  
- **Úc (AU)**  
  ![Australia Flag](https://openweathermap.org/images/flags/au.png)
