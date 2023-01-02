//package org.ValidTest;
//
//import org.openqa.selenium.By;
//import org.openqa.selenium.JavascriptExecutor;
//import org.openqa.selenium.Keys;
//import org.openqa.selenium.WebElement;
//import org.openqa.selenium.chrome.ChromeDriver;
//
//import java.time.Duration;
//
//import static java.lang.Thread.sleep;
//
//public class SearchSubmit_FullNameBackspacedChanged_ValidDates_OneRoom_OneGuest_ClicksFromComponentToComponent_ValidSearch {
//    public static void main(String[] args) throws InterruptedException {
//        // Path for Chrome Driver
//        System.setProperty("webdriver.chrome.driver", "C:\\Users\\seans\\Downloads\\chromedriver_win32\\chromedriver.exe");
//        ChromeDriver driver = new ChromeDriver();
//        JavascriptExecutor js = (JavascriptExecutor) driver;
//
//        driver.get("http:localhost:3000/");
//
//        // Type into Searchbar
//        WebElement searchBar = driver.findElement(By.id("searchbar"));
//        searchBar.sendKeys("Singapore, Singapore");
//        sleep(2000);
//
//        searchBar.click();
//        for(int i = 0; i < 9; i++){
//            sleep(1000);
//            searchBar.sendKeys(Keys.BACK_SPACE);
//        }
//
//
//        // Implicit Wait for Search Options to appear
//        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(2));
//
//        // Click Searchbar option
//        WebElement searchBarOption = driver.findElement(By.id("Singapore, Singapore"));
//        searchBarOption.click();
//
//        // Click on Start Datepicker
//        WebElement startDateList = driver.findElement(By.id("startdate"));
//        startDateList.click();
//        sleep(2000);
//
//        // Select date on Start Datepicker
//        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(2));
//        WebElement startDate = driver.findElement(By.cssSelector("div[aria-label='Choose Tuesday, July 26th, 2022']"));
//        startDate.click();
//
//        // Click on End Datepicker
//        WebElement endDateList = driver.findElement(By.id("enddate"));
//        endDateList.click();
//        sleep(2000);
//
//        // Click on date on End Datepicker
//        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(2));
//        WebElement endDate = driver.findElement(By.cssSelector("div[aria-label='Choose Friday, July 29th, 2022']"));
//        endDate.click();
//
//        // Click Submit button
//        sleep(2000);
//        WebElement submit = driver.findElement(By.id("submit"));
//        submit.click();
//    }
//}
