from gradio_client import Client
import matplotlib.pyplot as plt


def main():

    client = Client(
        "https://humanaigc-outfitanyone.hf.space/--replicas/o90fr/"
    )

    result = client.predict(1, api_name="/load_example")

    # Plot the result image
    path = result["value"]
    image = plt.imread(path)
    plt.imshow(image)
    plt.show()


if __name__ == '__main__':

    model = ''
    top = ''
    pants = ''

    main()
