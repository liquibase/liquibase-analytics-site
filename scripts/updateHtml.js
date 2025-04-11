const chartsArray = [
    "2024-11",
    "2024-12",
    "2025-01",
    "2025-02",
    "2025-03",
  ];

function getLatestChartDirectoryName() {
    const sortedChartsName = [...chartsArray].sort().reverse();
    return sortedChartsName[0];
  }

  function updateHeadingWithDirectoryName(directoryName, headingId, headingText) {
    const match = directoryName.match(/^(\d{4})-(\d{2})$/);
    if (match) {
      const year = match[1];
      const monthIndex = parseInt(match[2], 10) - 1;
      const monthName = new Intl.DateTimeFormat("en-US", {
        month: "long",
      }).format(new Date(year, monthIndex));

      document.getElementById(headingId).textContent = `${headingText} - ${monthName} ${year}`;
    } else {
      document.getElementById(headingId).textContent = `${headingText} - ${directoryName}`;
    }
  }

  function loadLatestChartsImage(imageId, directoryName, imageName) {
    const img = document.getElementById(imageId); 
    img.src = `../charts/${directoryName}/${imageName}`;
  }

  function onLoadDisplaySelection(directoryName, headingId, headingText, chartPageId1, chartName1) {//, chartPageId2, chartName2) {
    if (directoryName == null) {
      directoryName = getLatestChartDirectoryName();
      alert(
        "Default selection (current month data) will be displayed in the charts."
      );
    }
    updateHeadingWithDirectoryName(directoryName, headingId, headingText);
    loadLatestChartsImage(chartPageId1, directoryName, chartName1);
    // loadLatestChartsImage(chartPageId2, directoryName, chartName2);
  }

  function formatSelectedDate() {
    const yearSelect = document.getElementById("year-select");
    const monthSelect = document.getElementById("month-select");
    const selectedYear = yearSelect.value;
    const selectedMonth = monthSelect.value;

    if (selectedYear && selectedMonth) {
      return `${selectedYear}-${selectedMonth}`;
    } else {
      return null;
    }
  }

  function isSelectDateValid() {
    const yearSelect = document.getElementById("year-select");
    const monthSelect = document.getElementById("month-select");
    const selectedYear = yearSelect.value;
    const selectedMonth = monthSelect.value;

    if (selectedYear && selectedMonth) {
      return chartsArray.includes(`${selectedYear}-${selectedMonth}`);
    } else {
      return false;
    }
  }

  function selectYearAndMonthFromDefaultSelection() {
    const yearSelect = document.getElementById("year-select");
    const monthSelect = document.getElementById("month-select");
    const latestChartDirectoryName = getLatestChartDirectoryName();
    const [year, month] = latestChartDirectoryName.split("-");
    yearSelect.value = year;
    monthSelect.value = month;
  }