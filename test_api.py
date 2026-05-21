import requests
import io
from PIL import Image

# Create a simple test image
def create_test_image():
    # Create a simple image with a colored square on white background
    img = Image.new('RGB', (400, 400), color='white')
    from PIL import ImageDraw
    draw = ImageDraw.Draw(img)
    draw.rectangle([100, 100, 300, 300], fill='red')
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='PNG')
    img_byte_arr.seek(0)
    return img_byte_arr

# Test the API
def test_api():
    print("Creating test image...")
    test_image = create_test_image()
    
    print("Sending request to API...")
    url = "http://localhost:8000/remove-background"
    files = {'file': ('test.png', test_image, 'image/png')}
    
    try:
        response = requests.post(url, files=files)
        print(f"Response status: {response.status_code}")
        
        if response.status_code == 200:
            print("✓ API request successful!")
            print(f"Response content type: {response.headers.get('content-type')}")
            print(f"Response size: {len(response.content)} bytes")
            
            # Save the result
            with open('d:/windsruf/meit/test_result.png', 'wb') as f:
                f.write(response.content)
            print("✓ Result saved to test_result.png")
        else:
            print(f"✗ API request failed: {response.text}")
            
    except Exception as e:
        print(f"✗ Error: {str(e)}")

if __name__ == "__main__":
    test_api()
