package org.ValidTest;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

import static java.lang.Thread.sleep;
import static org.junit.Assert.assertEquals;

public class SearchSubmit_FullName_ValidDates_FourRoom_FourGuest_ClicksFromComponentToComponent_ValidSearch {
    public static void main(String[] args) throws InterruptedException {
        // Path for Chrome Driver
        System.setProperty("webdriver.chrome.driver", "C:\\Users\\seans\\Downloads\\chromedriver_win32\\chromedriver.exe");
        ChromeDriver driver = new ChromeDriver();

        driver.get("http:localhost:3000/");

        // Type into Searchbar
        WebElement searchBar = driver.findElement(By.id("searchbar"));
        searchBar.sendKeys("Singapore, Singapore");

        sleep(2000);
        // Implicit Wait for Search Options to appear
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(2));

        // Click Searchbar option
        WebElement searchBarOption = driver.findElement(By.id("Singapore, Singapore"));
        searchBarOption.click();

        // Click on Start Datepicker
        WebElement startDateList = driver.findElement(By.id("startdate"));
        startDateList.click();
        sleep(2000);

        // Select date on Start Datepicker
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(2));
        WebElement startDate = driver.findElement(By.cssSelector("div[aria-label='Choose Tuesday, July 26th, 2022']"));
        startDate.click();

        // Click on End Datepicker
        WebElement endDateList = driver.findElement(By.id("enddate"));
        endDateList.click();
        sleep(2000);

        // Click on date on End Datepicker
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(2));
        WebElement endDate = driver.findElement(By.cssSelector("div[aria-label='Choose Friday, July 29th, 2022']"));
        endDate.click();

        // Select Number of Rooms
        WebElement Rooms = driver.findElement(By.id("Rooms"));
        Rooms.click();
        sleep(2000);
        WebElement roomOptions = driver.findElement(By.id("Rooms dropdown_item 4"));
        roomOptions.click();

        // Select Number of Adults
        WebElement Adults = driver.findElement(By.id("Adults"));
        Adults.click();
        sleep(2000);
        WebElement adultOptions = driver.findElement(By.id("Adults dropdown_item 2"));
        adultOptions.click();

        // Select Number of Childern
        WebElement Children = driver.findElement(By.id("Children"));
        Children.click();
        sleep(2000);
        WebElement childrenOptions = driver.findElement(By.id("Children dropdown_item 2"));
        childrenOptions.click();
        sleep(2000);
        // Click Submit button
        WebElement submit = driver.findElement(By.id("submit"));
        submit.click();


    }
}
