import bernabeu from '../../assets/images/bernabeu.jpg';
import liverpoolBanner from '../../assets/images/Liverpool-Banner.png';
import oldTrafford from '../../assets/images/Old_Trafford_inside_20060726_1.jpg';
import parcDesPrinces from '../../assets/images/parc-des-princes.jpeg';
import signal from '../../assets/images/signal.jpg';

const images = [bernabeu, liverpoolBanner, oldTrafford, parcDesPrinces, signal];
let usedImages = [];  // Lưu trữ thứ tự hình ảnh đã chọn

export function getUniqueImage() {
    if (usedImages.length === images.length) {
        usedImages = [];  // Reset lại khi đã chọn hết các hình ảnh
    }

    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * images.length);
    } while (usedImages.includes(randomIndex)); // Đảm bảo hình ảnh chưa được chọn

    usedImages.push(randomIndex); // Thêm chỉ mục hình ảnh đã chọn vào mảng

    return images[randomIndex]; // Trả về hình ảnh tại chỉ mục đã chọn
}
 