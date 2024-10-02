function calculate() {
    const monthlyDeposit = parseFloat(document.getElementById('monthlyDeposit').value);
    const firstDepositDate = new Date(document.getElementById('firstDepositDate').value);
    const dischargeDate = new Date(document.getElementById('dischargeDate').value);
    const annualInterest = parseFloat(document.getElementById('annualInterest').value) / 100;

    if (isNaN(monthlyDeposit) || isNaN(annualInterest) || !firstDepositDate || !dischargeDate) {
        alert('모든 입력을 정확히 입력해주세요.');
        return;
    }

    let totalSavings = 0;
    let totalMatchingSupport = 0;

    let currentDate = new Date(firstDepositDate);

    while (currentDate <= dischargeDate) {
        const year = currentDate.getFullYear();
        let monthlyLimit = (year <= 2024) ? 400000 : 550000;
        let matchingRate = 0;

        if (year === 2022) matchingRate = 0.33;
        else if (year === 2023) matchingRate = 0.71;
        else if (year === 2024) matchingRate = 1.00;
        else if (year >= 2025) matchingRate = 1.25;

        const deposit = Math.min(monthlyDeposit, monthlyLimit);
        totalSavings += deposit;
        totalMatchingSupport += deposit * matchingRate;

        // 다음 달로 넘어가기
        currentDate.setMonth(currentDate.getMonth() + 1);
    }

    // 총 이자 계산 (단리로 가정)
    const totalInterest = totalSavings * annualInterest * ((dischargeDate - firstDepositDate) / (365 * 24 * 60 * 60 * 1000));

    const totalAmount = totalSavings + totalInterest + totalMatchingSupport;

    // 결과 출력
    document.getElementById('result').innerHTML = `
        <h2>계산 결과</h2>
        <p>총 적립액: ${totalSavings.toLocaleString()} KRW</p>
        <p>총 이자: ${totalInterest.toLocaleString()} KRW</p>
        <p>정부 매칭 지원금: ${totalMatchingSupport.toLocaleString()} KRW</p>
        <p><strong>최종 금액: ${totalAmount.toLocaleString()} KRW</strong></p>
    `;
}
