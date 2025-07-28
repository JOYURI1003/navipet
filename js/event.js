$(document).ready(function () {
  $(".slick-list").slick({
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  });
  $(".comn_slider").slick({
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  });

  $(".review-list").slick({
    infinite: false,
    slidesToShow: 2.2, // 2개 + 절반 정도
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    centerMode: false, // 왼쪽 정렬
    variableWidth: false, // 정해진 너비 유지
  });
  $(".filter_btn").on("click", function () {
    $(".filter-box").slideToggle(300); // 0.3초 애니메이션
  });
});
$(function () {
  // 스크롤 위치 감지
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $("#goTopBtn").fadeIn();
    } else {
      $("#goTopBtn").fadeOut();
    }
  });

  // 버튼 클릭 시 맨 위로 부드럽게 이동
  $("#goTopBtn").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 500);
    return false;
  });
});

$(function () {
  // 초기 상태: 전체 탭일 경우 4개만 보여주기
  $(".hospital").hide();
  $('.hospital[data-type="all"]').slice(0, 6).show();
  $("#moreBtn").show();

  // 더보기 버튼 클릭 시
  $("#moreBtn").on("click", function () {
    $(".hospital.more-all").slideDown();
    $(this).hide();
  });

  // 카테고리 탭 클릭 시
  $(".category").on("click", function () {
    const type = $(this).data("type");

    $(".category").removeClass("active");
    $(this).addClass("active");
    $(".hospital").hide();
    $("#moreBtn").hide();

    if (type === "all") {
      $('.hospital[data-type="all"]').slice(0, 6).show();
      $(".hospital.more-all").hide();
      $("#moreBtn").show();
    } else {
      $('.hospital[data-type="' + type + '"]')
        .slice(0, 6)
        .show();
    }
  });
});

$(window).on("scroll", function () {
  if ($(this).scrollTop() > 500) {
    $(".search-flex").stop(true, true).slideDown();
  } else {
    $(".search-flex").stop(true, true).slideUp();
  }
});

$("#filterBtn").on("click", function () {
  $(".hospital").hide();

  const keyword = $("#searchKeyword").val().toLowerCase();
  const selectedAnimals = $(".filter-animal:checked")
    .map(function () {
      return $(this).val();
    })
    .get();

  const selectedStatus = $(".filter-status:checked").val();
  const reservableOnly = $("#filter-reservable").is(":checked");
  const distance = $("#filter-distance").val();

  $(".hospital").each(function () {
    const $el = $(this);
    const animal = $el.data("animal");
    const status = $el.data("status");
    const reservable = $el.data("reservable");
    const hospitalDistance = parseInt($el.data("distance"));
    const name = $el.data("name").toLowerCase();

    let show = true;

    // 🔍 키워드 검색
    if (keyword && !name.includes(keyword)) show = false;

    // 🐾 동물 필터
    if (selectedAnimals.length && !selectedAnimals.includes(animal))
      show = false;

    // 🕐 상태 필터
    if (selectedStatus !== "any" && status !== selectedStatus) show = false;

    // ✅ 예약 가능
    if (reservableOnly && !reservable) show = false;

    // 📍 거리
    if (distance !== "all" && hospitalDistance > parseInt(distance))
      show = false;

    if (show) $el.show();
  });
});
