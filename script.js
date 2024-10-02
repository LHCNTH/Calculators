let runningTotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector('.screen');

function buttonClick(value) {
    if (isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            break;
        case '=':
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseFloat(buffer)); // Sửa thành parseFloat
            previousOperator = null;
            buffer = runningTotal.toString();
            runningTotal = 0;
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case ',':
            if (!buffer.includes('.')) {
                buffer += '.';
            }
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol) {
    if (buffer === '0') {
        return;
    }

    const floatBuffer = parseFloat(buffer); // Sửa thành parseFloat

    if (runningTotal === 0) {
        runningTotal = floatBuffer;
    } else {
        flushOperation(floatBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
}

function flushOperation(floatBuffer) { // Sửa tham số
    if (previousOperator === '+') {
        runningTotal += floatBuffer;
    } else if (previousOperator === '−') {
        runningTotal -= floatBuffer;
    } else if (previousOperator === '×') {
        runningTotal *= floatBuffer;
    } else if (previousOperator === '÷') {
        runningTotal /= floatBuffer;
    }
}

function handleNumber(numberString) {
    if (buffer === "0") {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

// Lắng nghe sự kiện keydown từ bàn phím
function handleKeyPress(event) {
    const key = event.key;
    let button;

    // Xử lý các phím số và dấu phẩy
    if (!isNaN(key) || key === '.') {
        buttonClick(key === '.' ? ',' : key);
        button = findButton(key === '.' ? ',' : key);
    }

    // Xử lý các phím toán học và chức năng
    if (key === 'Enter') {
        buttonClick('=');
        button = findButton('=');
    } else if (key === 'Backspace') {
        buttonClick('←');
        button = findButton('←');
    } else if (key === 'Escape') {
        buttonClick('C');
        button = findButton('C');
    } else if (key === '+') {
        buttonClick('+');
        button = findButton('+');
    } else if (key === '-') {
        buttonClick('−');
        button = findButton('−');
    } else if (key === '*') {
        buttonClick('×');
        button = findButton('×');
    } else if (key === '/') {
        buttonClick('÷');
        button = findButton('÷');
    }

    // Nếu tìm thấy nút tương ứng, thêm hiệu ứng màu vàng khi nhấn
    if (button) {
        button.classList.add('active');

        // Sau 150ms, loại bỏ class active để nút trở về màu cũ
        setTimeout(function () {
            button.classList.remove('active');
        }, 150);
    }
}

// Tìm nút dựa trên văn bản hiển thị
function findButton(text) {
    const buttons = document.querySelectorAll('.calc-button');
    for (let button of buttons) {
        if (button.innerText === text) {
            return button;
        }
    }
    return null;
}

function init() {
    document.querySelector('.calc-buttons').addEventListener('click', function (event) {
        buttonClick(event.target.innerText);
    });

    // Thêm lắng nghe sự kiện từ bàn phím
    document.addEventListener('keydown', handleKeyPress);
}

init();
