import argparse
import matplotlib.pyplot as plt
import pandas as pd

def plot_FRR_FAR(name):
    data = pd.read_csv(name+".csv")
    x = data["Threshold"]
    y1 = data["FAR"]
    y2 = data["FRR"]
    plt.grid(True)
    plt.plot(x,y1,label="FAR")
    plt.plot(x,y2,label="FRR")
    plt.title("Plot of FAR and FRR")
    plt.xlabel("Threshold")
    plt.ylabel("Error rate")
    plt.legend()
    plt.show()

def plot_ROC(name):
    data = pd.read_csv(name+".csv")
    x = data["FAR"].values
    print(x)
    y = [1-f for f in data["FRR"].values]
    plt.grid(True)
    plt.plot(x, y)
    plt.title("ROC curve")
    plt.xlabel("FAR")
    plt.ylabel("1-FRR")
    plt.show()

def main():
    parser = argparse.ArgumentParser()

    parser.add_argument("--type", type=str, required=True)
    parser.add_argument("--benchmark_file", type=str, required=True)

    args = parser.parse_args()

    type = args.type
    if not (type  in ["ROC", "FRR-FAR"]):
        raise Exception("The type must be either ROC or FRR-FAR")
    
    benchmark_file = args.benchmark_file

    if(type == "ROC"):
        plot_ROC(benchmark_file)
    else:
        plot_FRR_FAR(benchmark_file)


if __name__ == "__main__":
    main()
