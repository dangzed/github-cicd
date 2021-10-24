 **Điểm**: 100pt

**Mô tả**: Đừng nhìn vào đống command ở trang chủ mà nghĩ là có thể RCE được. Chúng tôi duyệt qua đối tượng được định nghĩa sẵn trong code rồi.

**Cách deploy**:

- Challenge cần deploy trên Ubuntu
- Cài đặt môi trường nodejs: **sudo apt install nodejs**
- Cài đặt NPM: **sudo apt install npm**
- Cài đặt các package sử dụng trong code:
  - **npm install express**
  - **npm install body-parser**
  - **npm install merge-recursive**
  - **npm install pug**

**Ý tưởng ra đề**: Lỗ hổng [Protoype Pollution](https://github.com/HoLyVieR/prototype-pollution-nsec18/blob/master/paper/JavaScript_prototype_pollution_attack_in_NodeJS.pdf) nằm trong top 10 kỹ thuật hack của năm 2018, tổng hợp bởi Porswigger

