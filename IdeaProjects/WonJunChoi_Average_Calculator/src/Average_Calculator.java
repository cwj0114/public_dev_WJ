public class Average_Calculator {

    public static void main (String[] args) {

        double temperature = 100.5;
        double resultC;
        double resultF;

        resultC = ( temperature - 32 ) / 1.8;
        resultF = ( temperature * 1.8 ) + 32;

        System.out.println("화씨" + temperature + "도의 섭씨온도는 :" + resultC + "도 입니다.");
        System.out.println("섭씨" + temperature + "도의 화씨온도는 :" + resultF + "도 입니다.");
    }
}
