import SwiftUI

struct ContentView: View {
    var body: some View {
        NavigationView {
            VStack {
                Text("Welcome to FieldDay!")
                    .font(.largeTitle)
                    .padding()

                Text("Join us for a day of fun and activities.")
                    .font(.subheadline)
                    .padding()

                NavigationLink(destination: ActivitiesView()) {
                    Text("View Activities")
                        .font(.headline)
                        .padding()
                        .background(Color.blue)
                        .foregroundColor(.white)
                        .cornerRadius(8)
                }
            }
            .navigationTitle("FieldDay")
        }
    }
}

struct ActivitiesView: View {
    var body: some View {
        Text("List of Activities")
            .font(.title)
            .padding()
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}