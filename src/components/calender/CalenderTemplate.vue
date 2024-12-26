<template>
  <div class="calendar-wrap-sub">
    <!-- 상단 월/연도 변경 -->
    <div class="calendar-header">
      <!--      <button @click="prevMonth">◀</button>-->
<!--       <span>{{ currentYear }}년 {{ currentMonth + 1 }}월</span>-->
      <!--      <button @click="nextMonth">▶</button>-->
    </div>

    <!-- 요일 헤더 -->
    <div class="calendar-grid">
      <div v-for="day in daysOfWeek" :key="day" class="calendar-day header"
      :style="day === '일' ? 'color:red;' : ''">
        {{ day }}
      </div>

      <!-- 날짜 -->
      <div
          v-for="(date, index) in calendarDays"
          :key="index"
          class="calendar-day"
          :class="{ 'current-date': isSelectedDate(date) }"
      >
        <span v-if="date">{{ date }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "calenderTemplate",
  props:{
    days:{
      type: String,
      default: () => {
        const today = new Date();
        return `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, "0")}.${String(today.getDate()).padStart(2, "0")}`;
      },
    }
  },
  data() {
    return {
      daysOfWeek: ["일", "월", "화", "수", "목", "금", "토"], // 요일
      currentYear: null,
      currentMonth: null,
      selectedDate: null,
    };
  },
  computed: {
    calendarDays() {
      const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay(); // 해당 달 1일의 요일
      const lastDate = new Date(this.currentYear, this.currentMonth + 1, 0).getDate(); // 해당 달 마지막 날짜
      const days = [];

      // 첫 주 빈칸 채우기
      for (let i = 0; i < firstDay; i++) {
        days.push(null);
      }

      // 해당 달의 날짜 추가
      for (let i = 1; i <= lastDate; i++) {
        days.push(i);
      }

      return days;
    },
  },
  mounted() {
    // props로 전달된 날짜 파싱
    const [year, month, day] = this.days.split(".").map(Number);
    this.currentYear = year;
    this.currentMonth = month - 1; // 월은 0부터 시작하므로 -1
    this.selectedDate = day;
  },
  methods: {
    prevMonth() {
      if (this.currentMonth === 0) {
        this.currentMonth = 11;
        this.currentYear -= 1;
      } else {
        this.currentMonth -= 1;
      }
    },
    nextMonth() {
      if (this.currentMonth === 11) {
        this.currentMonth = 0;
        this.currentYear += 1;
      } else {
        this.currentMonth += 1;
      }
    },
    isSelectedDate(date) {
      if (!date) return false;

      const [year, month, day] = this.days.split(".").map(Number);
      return (
          this.currentYear === year &&
          this.currentMonth === month - 1 &&
          date === day
      );
    },
  },
};
</script>

<style scoped lang="scss">
.calendar-wrap-sub {
  max-width: 400px;
  margin: 20px auto;
  font-family: Arial, sans-serif;
  text-align: center;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  font-weight: bold;
  font-size: 18px;
  span{
    color: #191c21;
  }
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr); /* 7일 기준 */
  gap: 5px;
}

.calendar-day {
  padding: 10px;
  border-radius: 4px;
  text-align: center;
  font-size: 14px;
}

.calendar-day.header {
  font-weight: bold;
}

.calendar-day.current-date {
  background-color: #E57373;
  color: #FFFFFF;
  font-weight: 500;
  border-radius: 999px;
}

</style>