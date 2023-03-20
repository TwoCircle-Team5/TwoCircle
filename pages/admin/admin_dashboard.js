import { dashBoardHandler } from "../../source/js/admin/admin_dashboard.js";

export function dashBoardRender() {
  const admin = document.querySelector("#admin");
  admin.innerHTML = /* html */ `
  <div class="container">
    <div class="title">
      <h2>보고서</h2>
    </div>
    <div class="admin_dashboard">
      <h2 class="chart_title">상품 수량 현황</h2>
      <div class="chart">
        <canvas id="myChart"></canvas>
      </div>
    <div class="dashboard_summary">
      <h2 class="summary_title">요약</h2>
      <div class="summary">
        <div class="summary_itemcount"><img class="filter_icon" src="../../image/box.png" alt="상품"><div class="itemcount"></div></div>
        <div class="summary_salesum"><img class="filter_icon" src="../../image/won.png" alt="원화"><div class="salesum"></div></div>
        <div class="summary_member"><img class="filter_icon" src="../../image/usercount.png" alt="유저수"><div class="member"></div></div>
      </div>
    </div>
      <div class="dashboard_table">
        <h2 class="table_title">상품 판매 현황</h2>
        <div class="table">
          <div class="table_navbar">
            <div class="navbar_name">번호</div>
            <div class="navbar_date">일자</div>
            <div class="navbar_user">사용자</div>
            <div class="navbar_bank">거래정보</div>
            <div class="navbar_saleprice">판매금액</div>
            <div class="navbar_item">상품명</div>
            <div class="navbar_cancelprice">환불금액</div>
            <div class="navbar_totalprice">매출 합계</div>
          </div>
          <div class="table_content"></div>
          <div class="table_pagination"></div>
      </div>
    </div> 
  </div>
  `;
  dashBoardHandler();
}
