package org.InvalidTest;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import static org.junit.Assert.*;
import java.time.Duration;
public class SearchSubmit_NameDeleted_ValidDates_OneRoom_OneGuest_ClicksFromComponentToComponent_InvalidSearch {
    public static void main(String[] args) throws InterruptedException {
        // Path for Chrome Driver
        System.setProperty("webdriver.chrome.driver", "C:\\Users\\seans\\Downloads\\chromedriver_win32\\chromedriver.exe");
        ChromeDriver driver = new ChromeDriver();

        driver.get("http:localhost:3000/");

        // Type into Searchbar
        WebElement searchBar = driver.findElement(By.id("searchbar"));
        searchBar.sendKeys("Singapore, Singapore");
        // Implicit Wait for Search Options to appear
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(2));

        // Click Searchbar option
        WebElement searchBarOption = driver.findElement(By.id("Singapore, Singapore"));
        searchBarOption.click();
        Thread.sleep(2000);

        //Deletes Search
        searchBar.sendKeys(Keys.CONTROL + "a");
        Thread.sleep(2000);
        searchBar.sendKeys(Keys.DELETE);


        // Click on Start Datepicker
        WebElement startDateList = driver.findElement(By.id("startdate"));
        startDateList.click();
        Thread.sleep(2000);

        // Select date on Start Datepicker
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(2));
        WebElement startDate = driver.findElement(By.cssSelector("div[aria-label='Choose Tuesday, July 26th, 2022']"));
        startDate.click();

        // Click on End Datepicker
        WebElement endDateList = driver.findElement(By.id("enddate"));
        endDateList.click();
        Thread.sleep(2000);

        // Click on date on End Datepicker
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(2));
        WebElement endDate = driver.findElement(By.cssSelector("div[aria-label='Choose Friday, July 29th, 2022']"));
        endDate.click();

        // Click Submit button
        Thread.sleep(2000);
        WebElement submit = driver.findElement(By.id("submit"));
        submit.click();

        // Wait for error search to appear
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        WebElement errorSearch = wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("searchbar_error")));

    }
}
