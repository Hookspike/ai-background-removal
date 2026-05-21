import requests
import io

# Test error handling with invalid file
def test_invalid_file():
    print("Testing error handling with invalid file...")
    url = "http://localhost:8000/remove-background"
    
    # Test with a text file instead of image
    test_content = b"This is not an image file"
    files = {'file': ('test.txt', io.BytesIO(test_content), 'text/plain')}
    
    try:
        response = requests.post(url, files=files)
        print(f"Response status: {response.status_code}")
        
        if response.status_code == 400:
            print("✓ Correctly rejected invalid file type")
            print(f"Error message: {response.text}")
        else:
            print(f"✗ Unexpected response: {response.text}")
            
    except Exception as e:
        print(f"✗ Error: {str(e)}")

# Test with no file
def test_no_file():
    print("\nTesting error handling with no file...")
    url = "http://localhost:8000/remove-background"
    
    try:
        response = requests.post(url, files={})
        print(f"Response status: {response.status_code}")
        print(f"Response: {response.text}")
        
    except Exception as e:
        print(f"✓ Correctly handled missing file: {str(e)}")

if __name__ == "__main__":
    test_invalid_file()
    test_no_file()
